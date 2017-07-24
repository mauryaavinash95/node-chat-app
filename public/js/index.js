var socket = io();

socket.on('connect', function () {
    console.log("Connected to the server");
});

socket.on('newMessage', function (message) {
    console.log("newMessage recieved is : ", message);
});

socket.on('disconnect', function () {
    console.log("Disconnected from the server");
})