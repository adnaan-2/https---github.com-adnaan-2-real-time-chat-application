const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Socket.io connection
io.on('connection', (socket) => {
    console.log("User connected", socket.id);

    socket.on('userMessage', (message) => {
        // Broadcast the message to all connected clients
        io.emit('userMessage', message);
    });

    socket.on('disconnect', () => {
        console.log("User disconnected", socket.id);
    });
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
server.listen(9000, () => {
    console.log("Server started on port 9000");
});
