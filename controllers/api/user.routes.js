const router = require('express').Router();
const { User, Thought} = require('../../models')


//This constains all the user routes as well as the add/delete friends
//Delete user will remove all thoughts made by that user

//GET ALL USERS
router.get('/', (req, res) => {
    User.find({})
    .select('-__v')
    .populate('friends')
    .populate('thoughts')
    .then(function(user){
        res.status(200).json(user)
    })});

//GET SINGLE USER
router.get('/:id', (req, res) => {
    User.findOne({_id: req.params.id})
    .select('-__v')
    .populate('friends')
    .populate('thoughts')
    .then(function(user){
        res.status(200).json(user)
    })});

//NEW USER
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
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
router.put('/:id/friends/:friendsid', (req, res) => {
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
router.delete('/:id/friends/:friendsid', (req, res) => {
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


module.exports = router;