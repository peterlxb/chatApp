$(function () {
    var socket = io();
    $('form').submit(function () {
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });

    socket.on('NewMessage', function(msg){
        //$("#message").append($('<li>').text(msg));
        console.log(msg)
    });
});