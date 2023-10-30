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


mongoose.connect(MONGO_URI, {}).then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log("Error connecting to MongoDB", err)
})


app.listen(3000, () => {
    console.clear()
    console.log('Server is running on port 3000')
})