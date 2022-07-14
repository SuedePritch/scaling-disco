const { Schema, Types, model } = require('mongoose');
//The reactionschema is a child of the thought model
//reactionId is a new objectId
//reactionBody is the text for the reaction
//username of the creator ... hardcoded at the moment but should pulled from auth on full stack
//createdAt is current date when completed and a virtual is made to format
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
//Thought schema
//thoughtText is the content of the thought
//createdAt is date when created virtual is made to format
//username of the user making the thought
//reaction is all the reaction from the reaction schema
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


//Seeds the database with a single thought that contains a reaction
//this wont be tied to any specific user as none exist at this point
Thought.find({}).exec((err, collection) => {
    if (collection.length === 0) {
        Thought.create({
            thoughtText: 'Joeys First Thought',
            username: 'Joey',
            reaction:[{
                reactionBody: 'this is a reaction',
                username:'mikey'
            }]
        },
        (err) => (err ? handleError(err) : console.log('Created new document'))
)}})

module.exports = Thought;
