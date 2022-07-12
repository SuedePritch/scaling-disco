const {Schema,model} = require('mongoose');
const {Thought} = require('./Thought')

const UserSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
        // unique: true, 
        // trimmed:true 
    },
    email: { 
        type: String, 
        required: true, 
        // unique: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
            },
        message: "Please enter a valid email"
    }
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    thoughts: [{
        type: Schema.ObjectId,
        ref: 'Thought',
    }],
});

const User = model('User', UserSchema);


const handleError = (err) => console.error(err);


User.find({}).exec((err, collection) => {
    if (collection.length < 8) {
        User.create({
            username: 'james',
            email: "james@gmail.com",
            friends:["62cd79b4207ef1843c16d87d"],
            thoughts:["62cd79c74f15113f61fe2afc"],
        },
        (err) => (err ? handleError(err) : console.log('Created new document'))
)}})

module.exports = User;
