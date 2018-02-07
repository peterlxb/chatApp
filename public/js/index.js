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

    socket.on('connect', function() {
        console.log('Connectted to server');
    });

    socket.on('NewMessage', function (message) {
        var li = jQuery('<li></li>');
        li.text(`${message.from}: ${message.text}`);
        $("#messages").append(li);
        console.log("newMessage", message);
    });

    
});