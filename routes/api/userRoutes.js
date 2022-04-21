const router = require('express').Router();
const { getUsers, getSingleUser, createUser, updateUser, deleteUser, createFriend, deleteFriend } = require('../../controllers/userController.js');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').delete(deleteUser).get(getSingleUser).put(updateUser);

router.route('/:userId/friends/:friendId').post(createFriend).delete(deleteFriend);

module.exports = router;