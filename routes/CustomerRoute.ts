import express, { Request, Response } from 'express';
import { CustomerForgotPassword, CustomerGetOTP, CustomerGetProfile, CustomerLogin, CustomerSignUp, CustomerUpdateProfile, CustomerVerify } from '../controllers';
import { Authenticate } from '../middlewares/CommonAuth';


const router = express.Router();

router.post('/sign-up', CustomerSignUp)

router.post('/login', CustomerLogin)

router.use(Authenticate)

router.patch('/verify', CustomerVerify)

router.patch('/forgot-password', CustomerForgotPassword)

router.get('/otp', CustomerGetOTP)

router.get('/profile', CustomerGetProfile)

router.patch('/profile', CustomerUpdateProfile)

export { router as CustomerRoute }