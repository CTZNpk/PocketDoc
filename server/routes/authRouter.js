const express=require("express")
const { getHelloController, signupController, signinController } = require("../controllers/authController")


const authRouter=express.Router()
authRouter.get('/',getHelloController),
authRouter.post('/signup',signupController)
authRouter.post('/signin',signinController)
module.exports=authRouter

