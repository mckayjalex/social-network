const { Thought, User } = require('../models');

module.exports = {
    getThoughts(req,res) {
        Thought.find()
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    createThought(req,res) {
        Thought.create(req.body)
        .then((thought) => User.findOneAndUpdate({ username: req.body.username }, { $addToSet: { thoughts: thought._id } } , { new: true }))
        .then((user) => !user ? res.status(404).json({ message: "No User with that Username" }) : res.json( "Thought Created" ))
        .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req,res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) => !thought ? res.status(404).json({ message: "No Thought with that ID"}) : res.json({ thought }))
        .catch((err) => res.status(500).json(err));
    },
    deleteThought(req,res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId})
        .then((thought) => !thought ? res.status(404).json({ message: "No Thought with that ID"}) : res.json({ message: "Thought Deleted" }))
        .catch((err) => res.status(500).json(err));
    },
    updateThought(req,res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId}, { $set: req.body }, { runValidators: true, new: true })
        .then((thought) => !thought ? res.status(404).json({ message: "No Thought with that ID"}) : res.json({ thought }))
        .catch((err) => res.status(500).json(err));
    },
    createReaction(req,res){
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body }}, { runValidators: true, new: true })
        .then((thought) => !thought ? res.status(404).json({ message: "No Thought with that ID"}) : res.json( thought ))
        .catch((err) => res.status(500).json(err));
    },
    deleteReaction(req,res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { runValidators: true, new: true })
        .then((thought) => !thought ? res.status(404).json({ message: "No Thought with that ID" }) : res.json( thought))
        .catch((err) => res.status(500).json(err));
    }
    
}