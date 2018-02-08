$(function () {
    var socket = io();

    $('form').submit(function () {

        socket.emit('createMessage', {
            from:'user',
            text: $('#m').val()
        } , function (data) {
            console.log('Got it', data);
        });
        $('#m').val('');
        return false;

    });

    var locationButton = $('#send-location');
    locationButton.click(function () {
        if(!navigator.geolocation) {
            return alert('Geolocation not supported by your browser');
        }

        locationButton.attr('disabled', 'disabled').text('Send location...');        

        navigator.geolocation.getCurrentPosition(function (position) {
            locationButton.removeAttr('disabled').text('Send location');
            socket.emit('createLocationMessage',{
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
            console.log(position)
        }, function () {
            locationButton.removeAttr('disabled').text('Send location');
            alert('Unable to fetch location');
        }) ;
    });

    socket.on('connect', function() {
        console.log('Connectted to server');
    });

    socket.on('NewMessage', function (message) {
        var formattedTime = moment(message.createdAt).format('h:mm a');
        var template = $('#message-template').html();
        var html = Mustache.render(template,{
            text: message.text,
            from:message.from,
            createdAt: formattedTime
        });

        $('#messages').append(html);
        console.log("newMessage", message);
    });

    socket.on('NewLocationMessage', function(message) {
        var formattedTime = moment(message.createdAt).format('h:mm a');
        var template = $('#location-message-template').html();
        var html = Mustache.render(template, {
            url: message.url,
            from: message.from,
            createdAt: formattedTime
        });

        $('#messages').append(html);
    });

    
});