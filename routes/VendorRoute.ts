import express, { Request, Response } from 'express';
import { VendorLogin, VendorProfile, VendorUpdateProfile, VendorUpdateService } from '../controllers';

const router = express.Router();


router.post('/vendor/login', VendorLogin)
router.get('/vendor/profile', VendorProfile)
router.patch('/vendor/profile', VendorUpdateProfile)

router.patch('/vendor/service', VendorUpdateService)



router.get('/')


export { router as VendorRoute }