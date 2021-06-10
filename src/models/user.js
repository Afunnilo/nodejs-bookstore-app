const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema ({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true

    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema)
