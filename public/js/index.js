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

    $('#send-loc').click(function () {
        if(!navigator.geolocation) {
            return alert('Geolocation not supported by your browser');
        }

        navigator.geolocation.getCurrentPosition(function (position) {
            socket.emit('createLocationMessage',{
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
            console.log(position)
        }, function () {
            alert('Unable to fetch location');
        }) ;
    });

    socket.on('connect', function() {
        console.log('Connectted to server');
    });

    socket.on('NewMessage', function (message) {
        var li = jQuery('<li></li>');
        li.text(`${message.from}: ${message.text}`);
        $("#messages").append(li);
        console.log("newMessage", message);
    });

    socket.on('NewLocationMessage', function(message) {
        var li = jQuery('<li></li>');
        var a = jQuery('<a target="_blank">My current location</a>');

        li.text(`${message.from}:`);
        a.attr('href',message.url);
        li.append(a);
        $("#messages").append(li);
    });

    
});