import bodyParser from 'body-parser';
import express from 'express';
import { AdminRoute, VendorRoute } from './routes';
import mongoose from 'mongoose';
import { MONGO_URI } from './config';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(AdminRoute);
app.use(VendorRoute);


mongoose.connect('mongodb://0.0.0.0:27017/fooddelivery', {
}).then(() => {
    console.log("Connected to Database !!!")
}).catch((err) => {
    console.log(err)
})


app.listen(3000, () => {
    console.clear()
    console.log('Server is running on port 3000')
})