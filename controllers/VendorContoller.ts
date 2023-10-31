import { Request, Response, NextFunction } from "express";
import { VendroLoginInputs } from "../dto";
import { FindVendor } from "./AdminController";
import { GenerateSignature, ValidatePassword } from "../utils/GenerateHashedPassword";


export const VendorLogin = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = <VendroLoginInputs>req.body;

    const vendor = await FindVendor(undefined, email);

    if (!vendor) {
        return res.status(404).json({
            "message": "Vendor not found"
        })
    }
    const isPasswordMatched = await ValidatePassword(password, vendor.salt, vendor.password)

    if (!isPasswordMatched) {
        return res.status(401).json({
            "message": "Invalid credentials"
        })
    }
    else {
        const signature = GenerateSignature({ _id: vendor._id, email: vendor.email, name: vendor.name, foodTypes: vendor.foodType })

        return res.status(200).json({
            "data": signature
        })
    }
}

export const VendorProfile = async (req: Request, res: Response, next: NextFunction) => {

}

export const VendorUpdateProfile = async (req: Request, res: Response, next: NextFunction) => {

}

export const VendorUpdateService = async (req: Request, res: Response, next: NextFunction) => {

}
