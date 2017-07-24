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

    // Playing around with EMAILS
    socket.emit('newEmail', {
        from: 'avinash@avinash.com',
        text: "Hello Email",
        createAt: (new Date()).toString(),
    });

    socket.on('createEmail', (newEmail) => {
        console.log('Create Email ', newEmail);
    });

    //End of playing around with EMAILS


    // Send a new message to the client from the server
    socket.emit('newMessage', {
        from: 'from@server.com',
        text: 'This is newMessage Event from server',
        createdAt: (new Date()).toString(),
    });


    socket.on('createMessage', function (messageContent) {
        console.log('New Message recieved at Server', messageContent);
    })

    socket.on('disconnect', () => {
        console.log("Client disconnected");
    });
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
