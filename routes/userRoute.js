const express = require('express');
const router = express.Router();
const {createUser,login, deleteUser, updateUser} = require('../controllers/userController');
const { auth } = require('../middlewares/auth');

router.post("/signup", createUser);
router.post("/login", login);
router.delete("/:id",deleteUser);
router.put("/:id",updateUser);


// TODO GOOGLE AUTH
// router.get('/google', authController.googleAuth);
// router.get('/google/redirect', authController.googleRedirect);


// TODO OTP AUTH
// router.post('/otp/verify', authController.verifyOtp);
// router.post('/otp/resend', authController.resendOtp);

module.exports = router;    