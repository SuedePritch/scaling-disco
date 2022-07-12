const router = require('express').Router();
const { User, Thought} = require('../models')

//GET ALL USERS
// Using model in route to find all documents that are instances of that model
router.get('/all-users', (req, res) => {
    User.find({})
    .populate('friends')
    .populate('thoughts')
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