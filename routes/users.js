const router = require('express').Router();
const {
  getUsers, getOneUser, createUser, updateMyProfile, updateMyAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getOneUser);
router.post('/', createUser);
router.patch('/me', updateMyProfile);
router.patch('/me/avatar', updateMyAvatar);

module.exports = router;
