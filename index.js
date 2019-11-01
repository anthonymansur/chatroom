const express = require('express');
const session = require("express-session");
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');

const { mongoURI } = require('./config');
require('./models');
require('./services/passport');

mongoose.connect(mongoURI);

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// configure the app to use bodyParser()
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: ["cats"]
    })
  ); 
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// routes
require('./routes/authentication')(app);

// app.get('/', (req, res) =>{
//     res.sendFile(__dirname + '/index.html');
// });

// let users = new Array(100);
// for (let i = 0; i < 100; i++) {
//     users[i] = 0;
// }
// const getUser = () => {
//     for (let i = 0; i < 100; i++) {
//         if (users[i] === 0) {
//             users[i] = 1;
//             return i + 1;
//         }
//     }
// };

// const removeUser = (num) => {
//     users[num - 1] = 0;
// };
// io.on('connection', socket => {
//     let user = getUser();
//     io.emit('chat message', `user${user} connected`);
//     socket.on('disconnect', () => {
//         removeUser(user);
//         io.emit('chat message', `user${user} disconnected`);
//     });
//     socket.on('chat message', (msg) => {
//         io.emit('chat message', `user${user}: ` + msg);
//     });
// });

app.listen(3000, () => {
    console.log('listening on *:3000');
});