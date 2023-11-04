import express, { Request, Response } from 'express';
import { CustomerAddToCart, CustomerCreateOrder, CustomerForgotPassword, CustomerGetOTP, CustomerGetOrderById, CustomerGetOrders, CustomerGetProfile, CustomerLogin, CustomerSignUp, CustomerUpdateProfile, CustomerVerify, DeleteCustomerCart, GetCustomerCart } from '../controllers';
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

router.post('/order', CustomerCreateOrder)

router.get('/orders', CustomerGetOrders)

router.get('/order/:id', CustomerGetOrderById)

router.post('/cart', CustomerAddToCart)
router.get('/cart', GetCustomerCart)
router.delete('/cart', DeleteCustomerCart)

export { router as CustomerRoute }