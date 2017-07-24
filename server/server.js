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
    // socket.emit from admin "Welcome to the chat app"
    socket.emit('newMessage', {
        from: "Admin",
        text: "Welcome to the CHAT app",
        createdAt: (new Date().getTime()),
    });

    // socket.broadcast.emit from Admin "New user joined".
    socket.broadcast.emit('newMessage', {
        from: "Admin",
        text: "New user has joined the chat app",
        createdAt: (new Date().getTime()),
    })

    socket.on('createMessage', function (messageContent) {
        console.log('New Message recieved at Server', messageContent);
        //  io.emit will broadcast the message to each and every socket including the one who sent it.
        io.emit('newMessage', {
            from: messageContent.from,
            text: messageContent.text,
            createdAt: (new Date().getTime()),
        });

        //socket.broadcast is used to emit the message to everyone but the origininating socket/client.
        // socket.broadcast.emit('newMessage', {
        //     from: messageContent.from,
        //     text: messageContent.text,
        //     createdAt: (new Date().getTime()),
        // })
    })

    socket.on('disconnect', () => {
        console.log("Client disconnected");
    });
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
