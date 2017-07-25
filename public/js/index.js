var socket = io();

socket.on('connect', function () {
    console.log("Connected to the server");
});

socket.on('newMessage', function (message) {
    console.log("newMessage recieved is : ", message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_">My current location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

socket.on('disconnect', function () {
    console.log("Disconnected from the server");
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'user',
        text: jQuery('[name=message]').val()
    }, function () {
        console.log('Ack recieved');
    })
});


var locationButton = jQuery('#sendLocation');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(
        function (position) {
            console.log(position);
            alert(position);
            // socket.emit('createLocationMessage', {
            //     latitude: position.coords.latitude,
            //     longitude: position.coords.longitude,
            // })
        }, function (err) {
            alert('Unable to fetch your coordinates', err);
        });
});