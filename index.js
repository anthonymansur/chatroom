const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html');
});

let count = 0;
io.on('connection', socket => {
    let user = ++count;
    io.emit('chat message', `user${user} connected`);
    socket.on('disconnect', () => {
        io.emit('chat message', `user${user} disconnected`);
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', `user${user}: ` + msg);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});