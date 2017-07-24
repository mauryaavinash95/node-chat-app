var socket = io();
socket.on('connect', function () {
    console.log("Connected to the server");

    // Send a message from the client to the server
    socket.emit('createMessage', {
        from: 'to@server.com',
        text: "Hello from client",
    });

});

socket.on('newMessage', function (messageContent) {
    console.log('New Message recieved at client', messageContent);
})


socket.on('disconnect', function () {
    console.log("Disconnected from the server");
})