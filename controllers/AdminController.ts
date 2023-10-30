
import { Request, Response, NextFunction } from 'express';
import { CreateVendorDto } from '../dto';
import { Vendor } from '../models/Vendor';
import { GenerateHash, GenerateHashedPassword } from '../utils/GenerateHashedPassword';


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

    const vendorExist = await Vendor.findOne({ email });
    if (vendorExist) {
        return res.status(400).json({
            "message": "Vendor already exist"
        })
    }

    const salt = await GenerateHash();
    const hashedPassword = await GenerateHashedPassword(password, salt);


    const createdVendor = await Vendor.create({
        name,
        ownerName,
        foodType,
        pincode,
        address,
        phone,
        email,
        password: hashedPassword,
        salt: salt,
    });


    res.json({
        "data": createdVendor
    })

}