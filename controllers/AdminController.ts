
import { Request, Response, NextFunction } from 'express';
import { CreateVendorDto } from '../dto';
import { Vendor } from '../models/Vendor';


export const GetVendors = async (req: Request, res: Response, next: NextFunction) => {

}

export const GetVendorById = async (req: Request, res: Response, next: NextFunction) => {

}

export const CreateVendor = async (req: Request, res: Response, next: NextFunction) => {

    const {
        name,
        ownerName,
        foodType,
        pincode,
        address,
        phone,
        email,
        password
    } = <CreateVendorDto>req.body;

    const createdVendor = await Vendor.create({
        name,
        ownerName,
        foodType,
        pincode,
        address,
        phone,
        email,
        password
    });


    res.json({
        "Vendor Created": {
            name,
            ownerName,
            foodType,
            pincode,
            address,
            phone,
            email,
            password
        }
    })

}