const mongoose = require('mongoose');
const crypto = require('crypto');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
});

userSchema.methods.setPassword = (password) => { 
     
    // Creating a unique salt for a particular user 
       this.salt = crypto.randomBytes(16).toString('hex'); 
     
    // Hashing user's salt and password with 1000 iterations, 
    //64 length and sha512 digest 
    this.hash = crypto.pbkdf2Sync(password, this.salt,  
    1000, 64, `sha512`).toString(`hex`); 
}; 

userSchema.methods.validPassword = function( pwd ) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`); 
    return this.hash === hash; 
};

module.exports = mongoose.model("User", userSchema);