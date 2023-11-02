import express, { Request, Response } from 'express';
import { FoodDoc, Vendor } from '../models';


export const GetFoodAvailability = async (req: Request, res: Response) => {

    try {
        const pincode = req.params.pincode;

        const foods = await Vendor.find({ pincode, serviceAvailable: true }).sort([["rating", "descending"]]).populate("foods");

        if (foods.length) {
            return res.status(200).json({
                "data": foods
            })

        }
        return res.status(404).json({
            "message": "No Data found"
        })


    } catch (error) {

        return res.status(500).json({
            "message": "Internal server error"
        })

    }
}

export const GetTopRestaurants = async (req: Request, res: Response) => {
    try {
        const pincode = req.params.pincode;

        const result = await Vendor.find({ pincode }).sort([["rating", "descending"]]).limit(1);

        if (result.length) {
            return res.status(200).json({
                "data": result
            })

        }
        return res.status(404).json({
            "message": "No Data found"
        })


    } catch (error) {

        return res.status(500).json({
            "message": "Internal server error"
        })

    }
}

export const GetFoodsIn30Min = async (req: Request, res: Response) => {
    try {
        const pincode = req.params.pincode;

        const result = await Vendor.find({ pincode }).sort([["rating", "descending"]]).populate("foods");

        if (result) {
            const foods = result.map((vendor) => {
                const food = vendor.foods.filter((food: FoodDoc) => {
                    return food.readyTime <= 30;
                })
                return food;
            })


            return res.status(200).json({
                "data": foods
            })



        }
    } catch (error) {

        return res.status(500).json({
            "message": "Internal server error"
        })

    }
}

export const SearchFoods = async (req: Request, res: Response) => {

    try {
        const searchedFood = req.params.search;

        const result = await Vendor.find({ searchedFood }).sort([["rating", "descending"]]).populate("foods");

        if (result) {

            const foods = result.map((vendor) => {
                const food = vendor.foods.filter((food: FoodDoc) => {
                    return food
                })
                return food;
            })
            return res.status(200).json({
                "data": foods
            })



        }
    } catch (error) {

        return res.status(500).json({
            "message": "Internal server error"
        })

    }
}

export const GetRestaurantById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const result = await Vendor.findById(id).populate("foods");

        if (result) {
            return res.status(200).json({
                "data": result
            })


        }
        return res.status(404).json({
            "message": "No Data found"
        })


    } catch (error) {
        return res.status(500).json({
            "message": "Internal server error"
        })

    }
}