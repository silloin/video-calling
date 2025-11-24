const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        // Use environment variable in production, allow localhost in development
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});



const emailToSocketMap = new Map();
const socketToEmailMap = new Map();




app.get('/', (req, res) => {
    res.send('Express server is running');
});

io.on('connection', socket => {

    console.log('New client connected:', socket.id);
    socket.on('room:join', data => {
        const { email, rooms } = data;
        emailToSocketMap.set(email, socket.id);
        socketToEmailMap.set(socket.id, email);
        socket.join(rooms);
        // Only emit to the socket that requested to join
        socket.emit('room:join', data);
        // Notify others in the room that a new user joined
        socket.to(rooms).emit('user:joined', { email, id: socket.id });

    });

    socket.on('user:call', data => {
        const { offer, to } = data;
        io.to(to).emit('incoming:call', { offer, from: socket.id });



    });

    socket.on('call:accepted', data => {
        const { answer, to } = data;
        io.to(to).emit('call:accepted', { answer, from: socket.id });
    });


    socket.on('peer:nego:needed', data => {
        const { offer, to } = data;
        io.to(to).emit('peer:nego:needed', { offer, from: socket.id });
    });

    socket.on('peer:nego:done', data => {
        const { answer, to } = data;
        io.to(to).emit('peer:nego:final', { answer, from: socket.id });
    });


    socket.on('message', msg => {
        console.log('Received message:', msg);
        io.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 8000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`Accepting connections from: ${CLIENT_URL}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
