import bodyParser from 'body-parser';
import express, { Application } from 'express';
import { AdminRoute, CustomerRoute, VendorRoute } from '../routes';
import path from 'path';
import { ShoppingRoute } from '../routes/ShoppingRoute';


export default async (app: Application) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('./images', express.static(path.join(__dirname, 'images')));

    app.use('/admin', AdminRoute);
    app.use('/vandor', VendorRoute);
    app.use('/shop', ShoppingRoute);
    app.use('/user', CustomerRoute)

    return app;
}
