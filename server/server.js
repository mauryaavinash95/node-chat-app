const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const {generateMessage, generateLocationMessage} = require('./utils/message');
// console.log(publicPath);
var app = express();
var server = http.createServer(app);
var port = process.env.PORT || 3000;
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("New user connected");

    // socket.emit from admin "Welcome to the chat app"
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    // socket.broadcast.emit from Admin "New user joined".
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined the chat'));

    socket.on('createMessage', function (messageContent, callback) {
        console.log('createMessage', messageContent);
       
        //  io.emit will broadcast the message to each and every socket including the one who sent it.
        io.emit('newMessage', generateMessage(messageContent.from, messageContent.text));
        callback();

        //socket.broadcast is used to emit the message to everyone but the origininating socket/client.
        // socket.broadcast.emit('newMessage', {
        //     from: messageContent.from,
        //     text: messageContent.text,
        //     createdAt: (new Date().getTime()),
        // })
    });

    socket.on('createLocationMessage', (coords)=>{
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log("Client disconnected");
    });
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
