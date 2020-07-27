const router = require('express').Router();
const {
  getUsers, getOneUser, updateMyProfile, updateMyAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getOneUser);
router.patch('/me', updateMyProfile);
router.patch('/me/avatar', updateMyAvatar);

module.exports = router;
