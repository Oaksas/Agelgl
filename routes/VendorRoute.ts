import express, { Request, Response } from 'express';
import { VendorLogin, VendorProfile, VendorUpdateProfile, VendorUpdateService } from '../controllers';
import { Authenticate } from '../middlewares/CommonAuth';

const router = express.Router();


router.post('/vendor/login', VendorLogin)

router.use(Authenticate)

router.get('/profile/vendor', VendorProfile)
router.patch('/vendor/profile', VendorUpdateProfile)
router.patch('/vendor/service', VendorUpdateService)



router.get('/')


export { router as VendorRoute }