const { Schema, Types, model } = require('mongoose');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId, 
        default: () => new Types.ObjectId()
    },
    reactionBody:{
        type: String,
        required: true,
        maxlength:280
    },
    username:{
        type: String,
        required:true
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
})

const ThoughtSchema = new Schema({
    thoughtText: { 
        type: String, 
        required: true,
        minlength: 1,  
        maxlength: 280,
    },
    createdAt: { 
        type: Date, 
        default: Date.now,
    },
    username:{
        type: String,
        required:true,
    },
    reaction: [ReactionSchema],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
});


ReactionSchema.virtual('createdAtFormatted').get(function () { return this.createdAt.toLocaleDateString("en-US") });
ThoughtSchema.virtual('createdAtFormatted').get(function () { return this.createdAt.toLocaleDateString("en-US") });
ThoughtSchema.virtual('reactionCount').get(function () { return this.reaction.length; });

const Thought = model('Thought', ThoughtSchema);


const handleError = (err) => console.error(err);

Thought.find({}).exec((err, collection) => {
    if (collection.length === 0) {
        Thought.create({
            thoughtText: 'James Pritchard',
            username: 'Joey',
            reaction:[{
                reactionBody: 'this is a reaction',
                username:'mikey'
            }]
        },
        (err) => (err ? handleError(err) : console.log('Created new document'))
)}})

module.exports = Thought;
