const path = require('path');
const http = require('http')
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage,generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation')
const { Users } = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3001
var  app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection',function(socket) {
    console.log('New  user connected');
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
       
        socket.emit('NewMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('NewMessage',generateMessage(`${params.name}`, `${params.name} has joined`));
        callback();
    });

    socket.on('createMessage', (message,callback) => {
        console.log("createMessage: ", message);

        io.emit('NewMessage',generateMessage(message.from, message.text));
        callback('This is from server');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('NewLocationMessage',generateLocationMessage('Admin',coords.latitude, coords.longitude));
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('NewMessage', generateMessage('Admin',`${user.name} has left`))
        }
    });
});

server.listen(port, () =>  {
    console.log(`listening on *:${port}`);
});