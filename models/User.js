const {Schema,model} = require('mongoose');

//User schema
//username of the user needs to be unique
//email needs to be unique and valid email structure(should send confirmation email to confirm)
//friends is a array of users that this user is friends with
//thoughts is an array that this user has created

const UserSchema = new Schema({
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
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
});

//virutal to get the number of friends
UserSchema.virtual('friendCount').get(function () { return this.friends.length; })

const User = model('User', UserSchema);


const handleError = (err) => console.error(err);

//Seed a single user
User.find({}).exec((err, collection) => {
    if (collection.length === 0) {
        User.create({
            username: 'james',
            email: "james@gmail.com",
            friends:[],
            thoughts:[],
        },
        (err) => (err ? handleError(err) : console.log('Created new document'))
)}})

module.exports = User;
