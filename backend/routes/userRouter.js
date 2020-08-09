const express = require('express');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// CAN ONLY BE USED IF LOGGD IN
router.patch('/updateuser', authController.protect, authController.updateUser);

router.use(authController.protect);
router.use(authController.restrictTo('admin'));

// FOLLOWING ROUTES ARE RESTRICTED TO ADMIN
router.post('/signup', authController.signup);
router.delete('/delete/:email_id', authController.deleteUser);

module.exports = router;