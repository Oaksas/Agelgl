import { Request, Response, NextFunction } from "express";


export const VendorLogin = async (req: Request, res: Response, next: NextFunction) => {
    res.send("Login")
}