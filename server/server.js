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

    // Send a new message to the client from the server
    // socket.emit('newMessage', {
    //     from: 'from@server.com',
    //     text: 'This is newMessage Event from server',
    //     createdAt: (new Date()).toString(),
    // });


    socket.on('createMessage', function (messageContent) {
        console.log('New Message recieved at Server', messageContent);
        io.emit('newMessage', {
            from: messageContent.from,
            text: messageContent.text,
            createdAt : (new Date().getTime()),
        });
    })

    socket.on('disconnect', () => {
        console.log("Client disconnected");
    });
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
