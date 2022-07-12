const router = require('express').Router();
const { User, Thought} = require('../models')

//GET ALL USERS
// Using model in route to find all documents that are instances of that model
router.get('/users', (req, res) => {
    User.find({})
    .populate('friends')
    .populate('thoughts')
    .then(function(user){
        res.status(200).json(user)
    })});

//GET SINGLE USER
router.get('/user/:id', (req, res) => {
    User.findOne({_id: req.params.id})
    .populate('friends')
    .populate('thoughts')
    .then(function(user){
        res.status(200).json(user)
    })});

//NEW USER
router.post('/user', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        friends:[req.body.friends],
        thoughts:[req.body.thoughts],
    })
    .then(function(user){
        res.status(200).json(user)
    })});

//UPDATE USER
router.put('/user/:id', (req, res) => {
    User.findOneAndUpdate(
    { _id: req.params.id },
    { 
        username: req.body.username,
        email: req.body.email,
        friends:[req.body.friends],
        thoughts:[req.body.thoughts],
    },
    // Sets to true so updated document is returned; Otherwise original document will be returned
    { new: true },)
    .then(function(user){
        res.status(200).json(user)
    })});


//DELETE USER
router.delete('/user/:id', (req, res) => {
    User.findOneAndDelete({ _id: req.params.id }, (err, result) => {
        if (result) {
            res.status(200).json(result);
            console.log(`Deleted: ${result}`);
        } else {
            console.log('Uh Oh, something went wrong');
            res.status(500).json({ message: 'something went wrong' });
        }
        });
    });


//Add Friend
router.put('/user/:id/friends/:friendsid', (req, res) => {
    User.findOneAndUpdate(
    { _id: req.params.id },
    { 
        $addToSet: {friends: req.params.friendsid}
    },
    // Sets to true so updated document is returned; Otherwise original document will be returned
    { new: true },)
    .then(function(user){
        res.status(200).json(user)
    })});


router.delete('/user/:id/friends/:friendsid', (req, res) => {
    User.findOneAndUpdate(
    { _id: req.params.id },
    { 
        $pull: {friends: req.params.friendsid}
    },
    // Sets to true so updated document is returned; Otherwise original document will be returned
    { new: true },)
    .then(function(user){
        res.status(200).json(user)
    })});



//GET ALL THOUGHTS
// Using model in route to find all documents that are instances of that model
router.get('/thoughts', (req, res) => {
    Thought.find({}, (err, result) => {
    if (err) {
        res.status(500).send({ message: 'Internal Server Error' });
    } else {
        res.status(200).json(result);
    }
    });
});

//SINGLE THOUGHT
router.get('/thought/:id', (req, res) => {
    Thought.findOne({_id: req.params.id})
    .then(function(user){
        res.status(200).json(user)
})});

//New Thought
router.post('/thought', (req, res) => {
    Thought.create({
        thoughtText: req.body.thoughtText,
            username: req.body.username,
            reaction:[{
                reactionBody: req.body.reaction.reactionBody,
                username:req.body.reaction.username
            }]
    })
    .then((thought) => {
        return User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
        );
    })
    .then((user) =>
        !user
            ? res.status(404).json({
            message: 'Thought created, but found no user with that ID',
            })
        : res.json('Created the thought 🎉')
    )
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
}),









module.exports = router;