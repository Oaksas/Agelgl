import express, { Request, Response } from 'express';

const router = express.Router();


router.post('/login', (req: Request, res: Response) => {

    res.send("Login")
}
)


router.get('/', (req: Request, res: Response) => {
    res.send("Vendor route")
}
)


export { router as VendorRoute }