import React from "react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useState, useEffect } from "react";
import { useSocket } from "../Context/Socketprovider";
import "./Lobby.css";

const Lobby = () => {
  const [rooms, setrooms] = useState("");
  const [email, setEmail] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!email || !rooms) {
        alert("Please enter both email and room name!");
        return;
      }
      socket.emit("room:join", { email, rooms }); // Logic to create a room
    },
    [email, rooms, socket]
  );

  const handlejoinRoom = useCallback(
    (data) => {
      const { email, rooms } = data;
      navigate(`/room/${rooms}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handlejoinRoom);
    return () => {
      socket.off("room:join", handlejoinRoom);
    };
  }, [socket, handlejoinRoom]);

  return (
    <div className="lobby-container">
      <div className="lobby-card">
        <div className="lobby-header">
          <div className="logo">
            <svg
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="25" cy="25" r="25" fill="url(#gradient)" />
              <path
                d="M25 15C19.48 15 15 19.48 15 25C15 30.52 19.48 35 25 35C30.52 35 35 30.52 35 25C35 19.48 30.52 15 25 15ZM25 20C26.66 20 28 21.34 28 23C28 24.66 26.66 26 25 26C23.34 26 22 24.66 22 23C22 21.34 23.34 20 25 20ZM25 32C22.33 32 19.98 30.51 18.67 28.36C18.72 26.22 22.67 25 25 25C27.33 25 31.28 26.22 31.33 28.36C30.02 30.51 27.67 32 25 32Z"
                fill="white"
              />
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0"
                  y1="0"
                  x2="50"
                  y2="50"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#667eea" />
                  <stop offset="1" stopColor="#764ba2" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1>Video Meet</h1>
          <p>Connect with anyone, anywhere</p>
        </div>

        <form onSubmit={handleSubmit} className="lobby-form">
          <div className="form-group">
            <label htmlFor="email">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.6667 3.33334H3.33333C2.41667 3.33334 1.675 4.08334 1.675 5.00001L1.66667 15C1.66667 15.9167 2.41667 16.6667 3.33333 16.6667H16.6667C17.5833 16.6667 18.3333 15.9167 18.3333 15V5.00001C18.3333 4.08334 17.5833 3.33334 16.6667 3.33334ZM16.6667 6.66668L10 10.8333L3.33333 6.66668V5.00001L10 9.16668L16.6667 5.00001V6.66668Z"
                  fill="currentColor"
                />
              </svg>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="roomName">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.8333 9.16667H14.1667V7.5C14.1667 4.73333 11.9333 2.5 9.16667 2.5C6.4 2.5 4.16667 4.73333 4.16667 7.5V9.16667H2.5C1.58333 9.16667 0.833333 9.91667 0.833333 10.8333V16.6667C0.833333 17.5833 1.58333 18.3333 2.5 18.3333H15.8333C16.75 18.3333 17.5 17.5833 17.5 16.6667V10.8333C17.5 9.91667 16.75 9.16667 15.8333 9.16667ZM5.83333 7.5C5.83333 5.65833 7.325 4.16667 9.16667 4.16667C11.0083 4.16667 12.5 5.65833 12.5 7.5V9.16667H5.83333V7.5Z"
                  fill="currentColor"
                />
              </svg>
              Room Code
            </label>
            <input
              type="text"
              id="roomName"
              name="roomName"
              value={rooms}
              onChange={(e) => setrooms(e.target.value)}
              placeholder="Enter room code"
              required
            />
          </div>

          <button type="submit" className="join-button">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8333 2.5H4.16667C3.25 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.25 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V4.16667C17.5 3.25 16.75 2.5 15.8333 2.5ZM8.33333 13.3333L4.16667 9.16667L5.34167 7.99167L8.33333 10.975L14.6583 4.65L15.8333 5.83333L8.33333 13.3333Z"
                fill="white"
              />
            </svg>
            Join Meeting
          </button>
        </form>

        <div className="lobby-footer">
          <p>🔒 Secure and encrypted</p>
        </div>
      </div>
    </div>
  );
};

export default Lobby;