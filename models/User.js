const mongoose = require('mongoose');

require('mongoose-type-email');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        trimmed:true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        validate: {
            validator: function(v) {
                return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
            },
        message: "Please enter a valid email"
    },
    thoughts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'thoughts',
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }]
}
});

const User = mongoose.model('User', userSchema);


const handleError = (err) => console.error(err);


User.create(
{
    username: 'James Pritchard',
    email: "james@gmail.com",
    thoughts:[],
    friends:[]
},
    (err) => (err ? handleError(err) : console.log('Created new document'))
);

module.exports = User;
