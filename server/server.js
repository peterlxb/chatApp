const path = require('path');
const http = require('http')
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3001
var  app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',function(socket) {
    console.log('New  user connected');

    socket.emit('NewMessage', {
        from: 'Admin',
        text: 'Welcome to chat app',
        createAt: new Date().getTime()
    });

    socket.broadcast.emit('NewMessage', {
        from: 'Admin',
        text: 'New user jonined',
        createAt: new Date().getTime()
    });

    socket.on('createMessage', (message) => {
        console.log("createMessage: ", message);

        io.emit('NewMessage',{
            from: message.from,
            text: message.text,
            createAt: new Date().getTime()
        });
        // socket.broadcast.emit('NewMessage',{
        //     from: message.from,
        //     text: message.text,
        //     createAt: new Date().getTime()
        // })
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

server.listen(port, () =>  {
    console.log(`listening on *:${port}`);
});