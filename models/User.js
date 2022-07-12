const {Schema,model} = require('mongoose');

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
            username: 'mikey',
            email: "mikey@gmail.com",
            friends:["62ccde53a3ccc8e6b0fd62ae"],
            thoughts:["62cccac5f4b00b9fa93eb955", "62cccad4760933c99550be33"],
        },
        (err) => (err ? handleError(err) : console.log('Created new document'))
)}})

module.exports = User;
