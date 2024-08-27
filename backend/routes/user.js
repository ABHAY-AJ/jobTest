const express = require("express");
const {registerUser, loginUser,getProfile} = require("../controller/userControl");

const router = express.Router();


router.post('/register',registerUser);

router.post('/login',loginUser);

router.get('/get-user',getProfile);

module.exports = router;