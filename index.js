const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html');
});

let users = new Array(100);
const getUser = () => {
    for (let i = 0; i < 100; i++) {
        if (users[i] === 0) {
            users[i] = 1;
            return i;
        }
    }
};
const removeUser = (num) => {
    users[i] = 0;
};
io.on('connection', socket => {
    let user = getUser();
    io.emit('chat message', `user${user} connected`);
    socket.on('disconnect', () => {
        removeUser(user);
        io.emit('chat message', `user${user} disconnected`);
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', `user${user}: ` + msg);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});