const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { Users } = require('./utils/users');
var app = express();
var server = http.createServer(app);
var port = process.env.PORT || 3000;
var io = socketIO(server);
var { isRealString } = require('./utils/validation');
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("New user connected");
    socket.on('join', (params, callback) => {

        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback("Name and Room name are required");
        }
        params.room = params.room.toUpperCase();
        socket.join(params.room);
        users.removeUser(socket.id);
        if (users.addUser(socket.id, params.name, params.room)) {
            return callback(`Username should be unique, ${params.name} already exists.`)
        }
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
        callback();
    });


    socket.on('createMessage', function (messageContent, callback) {
        var user = users.getUser(socket.id);
        if (user && isRealString(messageContent.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, messageContent.text));
        }
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        if (user) {
            io.emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
