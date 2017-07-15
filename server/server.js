const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const publicPath = path.join(__dirname, '../public');

// console.log(publicPath);
var app = express();
var server = http.createServer(app);
var port = process.env.PORT || 3000;
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("New user connected");

    socket.on('disconnect', ()=>{
        console.log("Client disconnected");
    });

});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
