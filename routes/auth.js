const express = require('express')
const router=express.Router();

const {
    register,
    login,
    forgotpassword,
    resetpassword,
    getUserById,
    getAllUsers
}=require('../controllers/auth')

router.route('/user').get(getAllUsers)

router.route('/user/:id').get(getUserById)

router.route('/register').post(register);

router.route('/login').post(login);

router.route('/forgotpassword').post(forgotpassword);

router.route('/resetpassword/:resetToken').put(resetpassword);

module.exports=router;
