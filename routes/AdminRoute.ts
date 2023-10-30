import express, { Request, Response, NextFunction } from 'express';
import { CreateVendor, GetVendorById, GetVendors } from '../controllers';

const router = express.Router();

router.get('/vendors', GetVendors)
router.get('vendor/:id', GetVendorById)
router.post('/vendor', CreateVendor);


export { router as AdminRoute };



