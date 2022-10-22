const router = require('express').Router();

const { getAllUser, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend } = require('../../controllers/user');

// Set up GET all and POST at /api/users
router.route('/').get(getAllUser).post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// Set up POST at /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
