const mongoose = require('mongoose');

const ThoughtSchema = new mongoose.Schema({
    thoughtText: { 
        type: String, 
        required: true,
        minlength: 1,  
        maxlength: 280,
    },
    createdAt: { 
        type: Date, default: Date.now,
    },
    username:{
        type: String,
        required:true,
    },
    reaction: [reactionSchema],
});

const Thought = mongoose.model('Thought', ThoughtSchema);


const handleError = (err) => console.error(err);


Thoughts.create(
{
    ThoughtText: 'James Pritchard',
    
},
    (err) => (err ? handleError(err) : console.log('Created new document'))
);

module.exports = Thought;
