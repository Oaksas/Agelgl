
import { Request, Response, NextFunction } from 'express';
import { CreateVendorDto } from '../dto';
import { Vendor } from '../models/Vendor';
import { GenerateHash, GenerateHashedPassword } from '../utils';


export const FindVendor = async (id: string | undefined, email?: string) => {
    if (id) {
        return await Vendor.findById(id);

    }
    else {
        return await Vendor.findOne({ email });
    }

}

export const GetVendors = async (req: Request, res: Response, next: NextFunction) => {

    const allVendors = await Vendor.find({});
    if (allVendors.length === 0) {
        return res.status(404).json({
            "message": "No vendors found"
        })
    }
    res.status(200).json({
        "data": allVendors
    })

}

export const GetVendorById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vendorId = req.params.id;
        const vendor = await FindVendor(vendorId);
        if (vendor) {
            res.status(200).json({
                "data": vendor
            })
        }
        if (!vendor) {
            return res.status(404).json({
                "message": "Vendor not found"
            })
        }


    } catch (error) {

        return res.status(500).json({
            "message": "Internal server error"
        })

    }
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

    const vendorExist = await FindVendor(undefined, email);
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