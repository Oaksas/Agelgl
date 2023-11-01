import { Request, Response, NextFunction } from "express";
import { EditVendorProfile, VendroLoginInputs } from "../dto";
import { FindVendor } from "./AdminController";
import { GenerateSignature, ValidatePassword } from "../utils";


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
    try {
        const user = req.user;
        if (user) {
            const userProfile = await FindVendor(user._id);
            return res.status(200).json({
                "data": userProfile
            })
        }
        else {
            return res.status(401).json({
                "message": "Unauthorized"
            })
        }
    } catch (error) {

        console.log(error)
    }

}

export const VendorUpdateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, phone, foodTypes, address } = <EditVendorProfile>req.body;

        const user = req.user;
        if (user) {
            const userProfile = await FindVendor(user._id);

            if (userProfile) {
                userProfile.name = name;
                userProfile.phone = phone;
                userProfile.foodType = foodTypes;
                userProfile.address = address;
                const result = await userProfile.save();
                return res.status(200).json({
                    "data": result
                })
            }
            return res.status(200).json({
                "data": userProfile
            })
        }
        else {
            return res.status(401).json({
                "message": "Unauthorized"
            })
        }
    } catch (error) {

        return res.status(500).json({
            "message": "Something went wrong"
        })
    }


}

export const VendorUpdateService = async (req: Request, res: Response, next: NextFunction) => {


    try {
        const user = req.user;
        if (user) {
            const userProfile = await FindVendor(user._id);

            if (userProfile) {
                userProfile.serviceAvailable = !userProfile.serviceAvailable;
                const result = await userProfile.save();
                return res.status(200).json({
                    "data": result
                })
            }
            return res.status(200).json({
                "data": userProfile
            })
        }
        else {
            return res.status(401).json({
                "message": "Unauthorized"
            })
        }
    } catch (error) {

        return res.status(500).json({
            "message": "Something went wrong"
        })
    }
}
