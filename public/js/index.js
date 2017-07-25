var socket = io();

socket.on('connect', function () {
    console.log("Connected to the server");
});

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    var li = jQuery('<li></li>');
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var a = jQuery('<a target="_">My current location</a>');
    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

socket.on('disconnect', function () {
    console.log("Disconnected from the server");
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'user',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('');
    })
});


var locationButton = jQuery('#sendLocation');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(
        function (position) {
            console.log(position);
            locationButton.removeAttr('disabled', 'disabled').text('Send location');
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            })
        }, function (err) {
            locationButton.removeAttr('disabled', 'disabled').text('Send location');
            alert('Unable to fetch your coordinates', err);
        });
});
