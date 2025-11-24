class Peer {
    constructor() {
        this.peer = null;
        this.createPeer();
    }

    createPeer() {
        // Close existing peer if it exists
        if (this.peer) {
            this.peer.close();
        }

        this.peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: [
                        "stun:stun.l.google.com:19302",
                        "stun:global.stun.twilio.com:3478",
                    ],
                },
            ],
        });
        console.log('Peer connection created');
    }

    // Check if peer connection is valid and open
    ensurePeerConnection() {
        if (!this.peer || this.peer.signalingState === 'closed') {
            console.log('Peer connection was closed, creating new one');
            this.createPeer();
        }
    }

    async getAnswer(offer) {
        this.ensurePeerConnection();
        await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await this.peer.createAnswer();
        await this.peer.setLocalDescription(new RTCSessionDescription(answer));
        return answer;
    }

    async setLocalDescription(answer) {
        this.ensurePeerConnection();
        await this.peer.setRemoteDescription(new RTCSessionDescription(answer));
    }

    async getOffer() {
        this.ensurePeerConnection();
        const offer = await this.peer.createOffer();
        await this.peer.setLocalDescription(new RTCSessionDescription(offer));
        return offer;
    }

    // Method to reset peer connection
    reset() {
        if (this.peer) {
            this.peer.close();
        }
        this.createPeer();
    }
}

export default new Peer();