import { Request, Response, NextFunction } from "express";
import { EditVendorProfile, VendroLoginInputs } from "../dto";
import { FindVendor } from "./AdminController";
import { GenerateSignature, ValidatePassword } from "../utils";
import { CreateFoodInput } from "../dto/Food.dto";
import { Food } from "../models";


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

export const VendorUpdateProfilePicture = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const user = req.user;
        if (user) {

            const vendor = await FindVendor(user._id);
            if (vendor) {
                const files = req.files as Express.Multer.File[];
                const images = files.map((file: Express.Multer.File) => file.filename);

                vendor.coverImages.push(...images);

                const result = await vendor.save();

                return res.status(200).json({
                    "data": result
                })

            }

            return res.status(404).json({
                "message": "Vendor not found"
            })
        }



    } catch (error) {
        res.status(500).json({
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



export const AddFood = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const user = req.user;
        if (user) {

            const { name, description, category, readyTime, foodType, price } = <CreateFoodInput>req.body;
            const vendor = await FindVendor(user._id);
            if (vendor) {
                const files = req.files as Express.Multer.File[];
                const images = files.map((file: Express.Multer.File) => file.filename);

                const createdFood = await Food.create({
                    vendorId: vendor._id,
                    name,
                    description,
                    category,
                    readyTime,
                    foodType,
                    price,
                    images: images,
                    rating: 2,
                })
                console.log(createdFood)
                vendor.foods.push(createdFood);
                const result = await vendor.save();

                return res.status(200).json({
                    "data": result
                })

            }

            return res.status(404).json({
                "message": "Vendor not found"
            })
        }



    } catch (error) {
        res.status(500).json({
            "message": "Something went wrong"
        })
    }

}

export const GetFoods = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;
    try {

        if (user) {
            const foods = await Food.find({ vendorId: user._id })
            console.log(foods)
            if (foods) {
                return res.status(200).json({
                    "data": foods
                })

            }
        }



        res.status(400).json({
            "message": "Food information not found"
        })
    } catch (error) {

        res.status(500).json({
            "message": "Something went wrong"
        })
    }

}

export const GetFoodById = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    try {
        if (user) {
            const food = await Food.findById(req.params.id);
            if (food) {
                return res.status(200).json({
                    "data": food
                })

            }
        }
        res.status(400).json({
            "message": "Food information not found"
        })
    }
    catch (error) {
        res.status(500).json({
            "message": "Something went wrong"
        })
    }


}