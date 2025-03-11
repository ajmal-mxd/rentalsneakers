const express=require('express')
const { login, signup } = require('../controllers/usercontroller')
const { registerValidation, loginValidation } = require('../middlewares/validation')
const router=express.Router()


router.post('/login',loginValidation,login)
router.post('/signup',registerValidation,signup)





module.exports=router