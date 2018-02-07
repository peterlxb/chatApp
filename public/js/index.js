// $(function () {
//     var socket = io();
//     // $('form').submit(function () {
//     //     socket.emit('createMessage', $('#m').val());
//     //     $('#m').val('');
//     //     return false;
//     // });

//     socket.on('connect', function() {
//         console.log('Connectted to server');
    
//         socket.emit('createMessage',  {
//             from: 'peter',
//             text:'Yup, that works for me'
//         });
//     });

//     socket.on('disconnect', function() {
//         console.lof('Disconnect from server');
//     });

//     socket.on('NewMessage', function(message){
//         //$("#message").append($('<li>').text(msg));
//         console.log("newMessage",message);
//     });
// });

var socket = io();

socket.on('connect', function () {
    console.log('Connectted to server');
});

socket.on('disconnect', function () {
    console.log('Disconnect from server');
});

socket.on('NewMessage', function (message) {
    //$("#message").append($('<li>').text(msg));
    console.log("newMessage", message);
});