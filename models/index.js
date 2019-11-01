const mongoose = require('mongoose');
const { mongoURI } = require('../config');

mongoose.connect(mongoURI);

const db = mongoose.connection;
db.on('error', function (error) {
    console.error(error);
});

module.exports = {
    User: require('./User')
};
