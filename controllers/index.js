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
    // .populate('friends')
    // .populate('thoughts')
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



//GET ALL THOUGHTS
// Using model in route to find all documents that are instances of that model
router.get('/all-thoughts', (req, res) => {
    Thought.find({}, (err, result) => {
    if (err) {
        res.status(500).send({ message: 'Internal Server Error' });
    } else {
        res.status(200).json(result);
    }
    });
});













module.exports = router;