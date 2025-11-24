import React, { useCallback, useEffect, useState, useRef } from 'react'
import { useSocket } from "../Context/Socketprovider";
import { useNavigate, useParams } from "react-router-dom";
import peer from "../service/peer";
import "./Room.css";

const Room = () => {
    const socket = useSocket();
    const navigate = useNavigate();
    const { roomId } = useParams();
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [MyStream, setMyStream] = useState();
    const myVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [remoteStream, setRemoteStream] = useState();
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [isCallActive, setIsCallActive] = useState(false);

    // ✅ Initialize camera only when needed (not automatically on mount)
    const initCamera = useCallback(async () => {
        // Don't initialize if already have stream
        if (MyStream) {
            return MyStream;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });
            setMyStream(stream);
            console.log('Camera initialized successfully');
            return stream;
        } catch (error) {
            console.error('Error accessing media devices:', error);
            if (error.name === 'NotAllowedError') {
                alert('Camera/Microphone access denied. Please allow access and try again.');
            } else if (error.name === 'NotReadableError') {
                alert('Camera/Microphone is already in use. Please close other apps using it and try again.');
            } else {
                alert('Error accessing camera/microphone: ' + error.message);
            }
            throw error;
        }
    }, [MyStream]);

    // Cleanup: Stop all tracks when component unmounts
    useEffect(() => {
        return () => {
            if (MyStream) {
                MyStream.getTracks().forEach(track => track.stop());
                setMyStream(null); // Ensure state reset on cleanup
                console.log('Camera stopped and stream cleared');
            }
        };
    }, [MyStream]);

    useEffect(() => {
        if (MyStream && myVideoRef.current) {
            myVideoRef.current.srcObject = MyStream;
        }
    }, [MyStream]);

    useEffect(() => {
        if (remoteStream && remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);

    const handlerUserjoined = useCallback(({ email, id }) => {
        console.log(`User joined: ${email} with ID: ${id}`);
        setRemoteSocketId(id);
    }, []);

    // ✅ Initiate a call to the remote user
    const handleCallUser = useCallback(async () => {
        try {
            // Initialize camera first
            await initCamera();
            setIsCallActive(true);

            // Ensure fresh peer connection
            // peer.reset(); // REMOVED to prevent closing signaling state prematurely

            const offer = await peer.getOffer();
            socket.emit('user:call', { offer, to: remoteSocketId });
        } catch (error) {
            console.error('Error initiating call:', error);
            alert('Error initiating call: ' + error.message);
        }
    }, [remoteSocketId, socket, initCamera]);

    // ✅ Initialize camera when receiving a call
    const handleIncomingCall = useCallback(async (data) => {
        const { from, offer } = data;
        setRemoteSocketId(from);
        setIsCallActive(true);

        try {
            // Initialize camera first
            await initCamera();

            // Ensure peer connection is fresh
            // peer.reset(); // REMOVED to prevent closing signaling state prematurely

            const answer = await peer.getAnswer(offer);
            socket.emit('call:accepted', { answer, to: from });
        } catch (error) {
            console.error('Error answering call:', error);
            alert('Error accepting call: ' + error.message);
        }
    }, [socket, initCamera]);

    const sendStream = useCallback(() => {
        if (!MyStream) {
            console.error('No stream available to send');
            return;
        }

        // Check if tracks are already added to avoid "sender already exists" error
        const senders = peer.peer.getSenders();
        const existingTracks = senders.map(sender => sender.track);

        // Remove senders for any tracks no longer present
        senders.forEach(sender => {
            if (sender.track && !MyStream.getTracks().includes(sender.track)) {
                peer.peer.removeTrack(sender);
                if (sender.track) {
                    console.log('Removed sender track:', sender.track.kind);
                }
            }
        });

        for (const track of MyStream.getTracks()) {
            // Only add track if it's not already added
            if (!existingTracks.includes(track)) {
                peer.peer.addTrack(track, MyStream);
                console.log('Track added:', track.kind);
            } else {
                console.log('Track already added:', track.kind);
            }
        }
        console.log('Stream sent successfully');
    }, [MyStream]);

    const handleCallAccepted = useCallback(async (data) => {
        const { from, answer } = data;
        await peer.setRemoteDescription(answer);
        console.log('Call accepted!');
        sendStream();
    }, [sendStream]);

    const handleNegotiationNeeded = useCallback(async () => {
        const offer = await peer.getOffer();
        socket.emit('peer:nego:needed', { offer, to: remoteSocketId });
    }, [remoteSocketId, socket]);

    useEffect(() => {
        peer.peer.addEventListener('negotiationneeded', handleNegotiationNeeded);
        return () => {
            peer.peer.removeEventListener('negotiationneeded', handleNegotiationNeeded);
        };
    }, [handleNegotiationNeeded]);

    const handleNegotiationIncoming = useCallback(async ({ from, offer }) => {
        const answer = await peer.getAnswer(offer);
        socket.emit('peer:nego:done', { answer, to: from });
    }, [socket]);

    const handleNegotiationFinal = useCallback(async ({ from, answer }) => {
        await peer.peer.setLocalDescription(answer);
    }, []);

    // Handle ICE candidates
    const handleIceCandidate = useCallback(async ({ candidate }) => {
        try {
            await peer.peer.addIceCandidate(candidate);
            console.log('Added remote ICE candidate');
        } catch (e) {
            console.error('Error adding received ice candidate', e);
        }
    }, []);

    useEffect(() => {
        const handleTrackEvent = (ev) => {
            console.log('Track received:', ev.track);
            console.log('Streams received:', ev.streams);
            const remStream = ev.streams[0];
            if (remStream) {
                console.log('Setting remote stream from event');
                setRemoteStream(remStream);
            } else {
                console.log('No stream in event, creating new MediaStream');
                setRemoteStream(prev => {
                    if (prev) {
                        prev.addTrack(ev.track);
                        return prev;
                    }
                    return new MediaStream([ev.track]);
                });
            }
        };

        peer.peer.addEventListener('track', handleTrackEvent);

        return () => {
            peer.peer.removeEventListener('track', handleTrackEvent);
        };
    }, []);

    useEffect(() => {
        socket.on('user:joined', handlerUserjoined);
        socket.on('incoming:call', handleIncomingCall);
        socket.on('call:accepted', handleCallAccepted);
        socket.on('peer:nego:needed', handleNegotiationIncoming);
        socket.on('peer:nego:final', handleNegotiationFinal);
        socket.on('peer:ice-candidate', handleIceCandidate);

        return () => {
            socket.off('user:joined', handlerUserjoined);
            socket.off('incoming:call', handleIncomingCall);
            socket.off('call:accepted', handleCallAccepted);
            socket.off('peer:nego:needed', handleNegotiationIncoming);
            socket.off('peer:nego:final', handleNegotiationFinal);
            socket.off('peer:ice-candidate', handleIceCandidate);
        };
    }, [socket, handlerUserjoined, handleIncomingCall, handleCallAccepted, handleNegotiationIncoming, handleNegotiationFinal, handleIceCandidate]);

    // 🎤 Toggle Mute/Unmute
    const toggleMute = useCallback(() => {
        if (MyStream) {
            const audioTrack = MyStream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setIsMuted(!audioTrack.enabled);
            }
        }
    }, [MyStream]);

    // 📹 Toggle Video On/Off
    const toggleVideo = useCallback(() => {
        if (MyStream) {
            const videoTrack = MyStream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                setIsVideoOff(!videoTrack.enabled);
            }
        }
    }, [MyStream]);

    // 📞 End Call
    const endCall = useCallback(() => {
        // Stop all tracks
        if (MyStream) {
            MyStream.getTracks().forEach(track => track.stop());
            setMyStream(null);
        }

        // Reset peer connection for next call
        // peer.reset(); // REMOVED to prevent closing signaling state prematurely

        // Navigate back to lobby
        navigate('/');
    }, [MyStream, navigate]);

    return (
        <div className="room-container">
            {/* Header */}
            <div className="room-header">
                <div className="room-info">
                    <h2>Room: {roomId}</h2>
                    <div className="status-indicator">
                        <span className={`status-dot ${remoteSocketId ? 'connected' : 'waiting'}`}></span>
                        <span>{remoteSocketId ? "Connected" : "Waiting for others..."}</span>
                    </div>
                </div>
            </div>

            {/* Video Grid */}
            <div className="video-grid">
                {/* Remote Video (Large) */}
                {remoteStream ? (
                    <div className="video-container remote-video">
                        <video
                            ref={remoteVideoRef}
                            autoPlay
                            playsInline
                        />
                        <div className="video-label">Remote User</div>
                    </div>
                ) : (
                    <div className="video-container empty-video">
                        <div className="empty-state">
                            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="40" cy="40" r="40" fill="rgba(255,255,255,0.1)" />
                                <path d="M40 20C28.96 20 20 28.96 20 40C20 51.04 28.96 60 40 60C51.04 60 60 51.04 60 40C60 28.96 51.04 20 40 20ZM40 28C43.32 28 46 30.68 46 34C46 37.32 43.32 40 40 40C36.68 40 34 37.32 34 34C34 30.68 36.68 28 40 28ZM40 54C35.33 54 31.16 51.51 28.67 47.72C28.76 43.82 36.67 41.67 40 41.67C43.33 41.67 51.24 43.82 51.33 47.72C48.84 51.51 44.67 54 40 54Z" fill="white" />
                            </svg>
                            <p>Waiting for remote user...</p>
                        </div>
                    </div>
                )}

                {/* My Video (Small - Picture in Picture) */}
                {MyStream && (
                    <div className="video-container my-video-pip">
                        <video
                            ref={myVideoRef}
                            autoPlay
                            playsInline
                            muted
                        />
                        <div className="video-label">You</div>
                        {isVideoOff && <div className="video-off-overlay">Camera Off</div>}
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="controls-container">
                {/* Turn On Camera Button (Always visible if no stream) */}
                {!MyStream && (
                    <button className="control-btn" onClick={initCamera}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 10.5V7C17 5.89 16.1 5 15 5H4C2.9 5 2 5.89 2 7V17C2 18.1 2.9 19 4 19H15C16.1 19 17 18.1 17 17V13.5L21 17.5V6.5L17 10.5Z" fill="currentColor" />
                        </svg>
                        Turn On Camera
                    </button>
                )}

                {!isCallActive && remoteSocketId && (
                    <button className="control-btn call-btn" onClick={handleCallUser}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.01 15.38C18.78 15.38 17.59 15.18 16.48 14.82C16.13 14.7 15.74 14.79 15.47 15.06L13.9 17.03C11.07 15.68 8.42 13.13 7.01 10.2L8.96 8.54C9.23 8.26 9.31 7.87 9.2 7.52C8.83 6.41 8.64 5.22 8.64 3.99C8.64 3.45 8.19 3 7.65 3H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21C20.72 21 21 20.37 21 19.82V16.37C21 15.83 20.55 15.38 20.01 15.38Z" fill="currentColor" />
                        </svg>
                        Start Call
                    </button>
                )}

                {MyStream && (
                    <>
                        {/* Mute/Unmute Button */}
                        <button
                            className={`control-btn ${isMuted ? 'muted' : ''}`}
                            onClick={toggleMute}
                            title={isMuted ? "Unmute" : "Mute"}
                        >
                            {isMuted ? (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 11H17.3C17.3 11.74 17.14 12.43 16.87 13.05L18.1 14.28C18.66 13.3 19 12.19 19 11ZM14.98 11.17C14.98 11.11 15 11.06 15 11V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V5.18L14.98 11.17ZM4.27 3L3 4.27L9.01 10.28V11C9.01 12.66 10.34 14 12 14C12.22 14 12.44 13.97 12.65 13.92L14.31 15.58C13.6 15.91 12.81 16.1 12 16.1C9.24 16.1 6.7 14 6.7 11H5C5 14.41 7.72 17.23 11 17.72V21H13V17.72C13.91 17.59 14.77 17.27 15.54 16.82L19.73 21L21 19.73L4.27 3Z" fill="currentColor" />
                                </svg>
                            ) : (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 14C13.66 14 14.99 12.66 14.99 11L15 5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 12.66 10.34 14 12 14ZM17.3 11C17.3 14 14.76 16.1 12 16.1C9.24 16.1 6.7 14 6.7 11H5C5 14.41 7.72 17.23 11 17.72V21H13V17.72C16.28 17.24 19 14.42 19 11H17.3Z" fill="currentColor" />
                                </svg>
                            )}
                        </button>

                        {/* Video On/Off Button */}
                        <button
                            className={`control-btn ${isVideoOff ? 'video-off' : ''}`}
                            onClick={toggleVideo}
                            title={isVideoOff ? "Turn On Camera" : "Turn Off Camera"}
                        >
                            {isVideoOff ? (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 6.5L17 10.5V7C17 5.89 16.1 5 15 5H9.82L21 16.18V6.5ZM3.27 2L2 3.27L4.73 6H4C2.9 6 2 6.9 2 8V16C2 17.1 2.9 18 4 18H15C15.21 18 15.39 17.95 15.57 17.89L19.73 22.05L21 20.78L3.27 2Z" fill="currentColor" />
                                </svg>
                            ) : (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17 10.5V7C17 5.89 16.1 5 15 5H4C2.9 5 2 5.89 2 7V17C2 18.1 2.9 19 4 19H15C16.1 19 17 18.1 17 17V13.5L21 17.5V6.5L17 10.5Z" fill="currentColor" />
                                </svg>
                            )}
                        </button>

                        {/* End Call Button */}
                        <button
                            className="control-btn end-call-btn"
                            onClick={endCall}
                            title="End Call"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 9C10.4 9 8.85 9.25 7.4 9.72V12.82C7.4 13.22 7.17 13.56 6.84 13.72C5.86 14.21 4.97 14.84 4.17 15.57C3.95 15.76 3.66 15.86 3.36 15.86C3.06 15.86 2.77 15.76 2.55 15.57L0.29 13.31C0.11 13.13 0 12.88 0 12.61C0 12.34 0.11 12.09 0.29 11.91C3.34 8.87 7.46 7 12 7C16.54 7 20.66 8.87 23.71 11.91C23.89 12.09 24 12.34 24 12.61C24 12.88 23.89 13.13 23.71 13.31L21.45 15.57C21.23 15.76 20.94 15.86 20.64 15.86C20.34 15.86 20.05 15.76 19.83 15.57C19.03 14.84 18.14 14.21 17.16 13.72C16.83 13.56 16.6 13.22 16.6 12.82V9.72C15.15 9.25 13.6 9 12 9Z" fill="currentColor" />
                            </svg>
                        </button>

                        {/* Send Stream Button (if needed) */}
                        {!remoteStream && (
                            <button className="control-btn send-stream-btn" onClick={sendStream}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor" />
                                </svg>
                                Send Stream
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Room;
