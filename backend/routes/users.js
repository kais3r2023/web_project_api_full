const express = require('express');
const {getAllUsers, getUser, updateProfile, updateAvatar, getUserProfile}= require('../controllers/users');


const router = express.Router();



router.get('/', getAllUsers);
router.get('/:id',getUser);
/* router.post('/',createUser); */   // a borrar
router.get('/me', getUserProfile)
router.patch('/me',updateProfile);
router.patch('/me/avatar',updateAvatar);



module.exports = router;
