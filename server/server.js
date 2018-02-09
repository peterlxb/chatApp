const path = require('path');
const http = require('http')
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage,generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation')
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3001
var  app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',function(socket) {
    console.log('New  user connected');

    socket.emit('NewMessage', generateMessage('Admin','Welcome to the chat app'));

    socket.broadcast.emit('NewMessage', generateMessage('Admin', 'New user joined'));

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room are required');
        }

        callback();
    });

    socket.on('createMessage', (message,callback) => {
        console.log("createMessage: ", message);

        io.emit('NewMessage',generateMessage(message.from, message.text));
        callback('This is from server');
        //   socket.broadcast.emit('NewMessage',{
        //     from: message.from,
        //     text: message.text,
        //     createAt: new Date().getTime()
        // })
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('NewLocationMessage',generateLocationMessage('Admin',coords.latitude, coords.longitude));
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

server.listen(port, () =>  {
    console.log(`listening on *:${port}`);
});