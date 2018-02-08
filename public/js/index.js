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
        
        var li = jQuery('<li></li>');
        li.text(`${message.from}: ${formattedTime}: ${message.text}`);
        $("#messages").append(li);

        console.log("newMessage", message);
    });

    socket.on('NewLocationMessage', function(message) {
        var formattedTime = moment(message.createdAt).format('h:mm a');

        var li = jQuery('<li></li>');
        var a = jQuery('<a target="_blank">My current location</a>');
        li.text(`${message.from}: ${formattedTime} `);
        a.attr('href',message.url);
        li.append(a);
        $("#messages").append(li);
    });

    
});