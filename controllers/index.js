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
        const thoughtIdArr = result.thoughts;
        Thought.find({_id: thoughtIdArr}, (err, result) => {
            for (let i = 0; i < result.length; i++) {
                const thoughtId = result[i]._id;
                Thought.findOneAndDelete({ _id: thoughtId }, (err, result) => {
                    if (err) {
                        res.status(500).json({ message: 'something went wrong' });
                    } 
                    });
            }        
            
            res.status(200).json(result);
            
            
        });
    })
});



    

//ADD FRIEND
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

//DELETE FRIEND
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
        : res.json(user)
    )
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
}),


//UPDATE THOUGHT
router.put('/thought/:id', (req, res) => {
    Thought.findOneAndUpdate(
    { _id: req.params.id },
    { 
        thoughtText: req.body.thoughtText,
        username: req.body.username
    },
    // Sets to true so updated document is returned; Otherwise original document will be returned
    { new: true },)
    .then(function(user){
        res.status(200).json(user)
    })});

//DELETE THOUGHT
router.delete('/thought/:id', (req, res) => {
    Thought.findOneAndDelete({ _id: req.params.id }, (err, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(500).json({ message: 'something went wrong' });
        }
        });
    });




//NEW REACTION
router.post('/thought/:thoughtId/reaction', (req, res) => {
    Thought.findOneAndUpdate({_id: req.params.thoughtId},
        { 
            $addToSet:{reaction:[{
                reactionBody: req.body.reactionBody,
                username:req.body.username
            }]}
        },
        // Sets to true so updated document is returned; Otherwise original document will be returned
        { new: true },)
        .then(function(user){
            res.status(200).json(user)
})});

//DELETE REACTION
router.delete('/thought/:thoughtId/reaction/:reactionId', (req, res) => {
    Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    {  
        $pull: {reaction: 
            {
                reactionId: req.params.reactionId
            }
        }
    },
    // Sets to true so updated document is returned; Otherwise original document will be returned
    { new: true },)
    .then(function(user){
        res.status(200).json(user)
    })});



module.exports = router;