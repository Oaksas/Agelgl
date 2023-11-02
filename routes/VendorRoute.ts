import express, { Request, Response } from 'express';
import { AddFood, GetFoodById, GetFoods, VendorLogin, VendorProfile, VendorUpdateProfile, VendorUpdateProfilePicture, VendorUpdateService } from '../controllers';
import { Authenticate } from '../middlewares/CommonAuth';
import multer from 'multer';

const router = express.Router();

const imageStorage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const images = multer({ storage: imageStorage }).array('images', 10);


router.post('/login', VendorLogin)

router.use(Authenticate)

router.get('/profile', VendorProfile)
router.patch('/profile', VendorUpdateProfile)
router.patch('/coverimage', images, VendorUpdateProfilePicture)
router.patch('/service', VendorUpdateService)

router.post('/food', images, AddFood)
router.get('/food/:id', GetFoodById)
router.get('/foods', GetFoods)


router.get('/')


export { router as VendorRoute }