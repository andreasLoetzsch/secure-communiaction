const express = require('express');
const router = express.Router();
const {registerUser, loginUser, giveUserJwt} = require('../controllers/userController')

router.post('/register', registerUser)
router.post('/login', loginUser, giveUserJwt)

module.exports = router