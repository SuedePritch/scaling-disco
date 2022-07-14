const router = require('express').Router();
const { Thought} = require('../../models')

//This constains all the thought routes as well as the add/delete reactions


//GET ALL THOUGHTS
// Using model in route to find all documents that are instances of that model
router.get('/', (req, res) => {
    Thought.find({})
    .select('-__v')
    .then(function(user){
        res.status(200).json(user)
    })
});

//SINGLE THOUGHT
router.get('/:id', (req, res) => {
    Thought.findOne({_id: req.params.id})
    .select('-__v')
    .then(function(user){
        res.status(200).json(user)
})});



//New Thought
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
    Thought.findOneAndDelete({ _id: req.params.id }, (err, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(500).json({ message: 'something went wrong' });
        }
        });
    });




//NEW REACTION
router.post('/:thoughtId/reaction', (req, res) => {
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
router.delete('/:thoughtId/reaction/:reactionId', (req, res) => {
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