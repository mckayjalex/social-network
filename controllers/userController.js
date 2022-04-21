const { User } = require('../models');

module.exports = {
    // GETS All Users
    getUsers(req,res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    // GETS A Single User
    getSingleUser(req,res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then((user) => {
            !user ? res.status(404).json({ message: 'No user with that ID'}) : res.json({ user })
        })
        .catch((err) => res.status(500).json(err));
    },
    // POSTS A New User
    createUser(req,res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    // DELETES A User
    deleteUser(req, res) {
        User.findOneAndRemove({_id: req.params.userId})
        .then((user) => {
            !user ? res.status(404).json({ message: 'No user with that ID'}) : res.json({ user })
        })
        .catch((err) => res.status(500).json(err));
    },
    // UPDATE A User
    updateUser(req,res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true })
        .then((user) => {
            !user ? res.status(404).json({ message: 'No user with that ID' }) : res.json({ user })
        })
        .catch((err) => res.status(500).json(err));
    },
    // ADD A Friend to a User
    createFriend(req,res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { runValidators: true, new: true })
        .then((user) => {
            !user ? res.status(404).json({ message: "No user with that ID"}) : res.json({ user });
        })
        .catch((err) => res.status(500).json(err));
    },
    // DELETE A Friend from a User
    deleteFriend(req,res) {
        User.findOneAndUpdate({ _id: req.params.userId}, { $pull: { friends: req.params.friendId } }, { runValidators: true, new: true })
        .then((user) => {
            !user ? res.status(404).json({ message: "No user with that ID"}) : res.json({ user});
        })
        .catch((err) => res.status(500).json(err));
    }
} 