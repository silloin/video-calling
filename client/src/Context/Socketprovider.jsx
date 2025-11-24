import React, { createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();
export const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket;
}

// Derive backend URL dynamically from window.location or environment variable
const getBackendUrl = () => {
    // Use environment variable in production (set in Render)
    if (process.env.REACT_APP_BACKEND_URL) {
        return process.env.REACT_APP_BACKEND_URL;
    }

    // Fallback to dynamic detection for localhost
    const loc = window.location;
    let backendPort = "8000";
    let origin = loc.protocol + "//" + loc.hostname;

    // Use the backend port explicitly set for websocket connections
    if (loc.hostname === "localhost") {
        origin += `:${backendPort}`;
    }

    return origin;
};

const socket = io(getBackendUrl());

export const SocketProvider = (props) => {
    const { children } = props;
    const socket = useMemo(() => io(getBackendUrl()), []);
    console.log(socket);
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
