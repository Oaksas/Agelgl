import mongoose, { Schema, Document } from "mongoose";

export interface FoodDoc extends Document {
    vendorId: string;
    name: string;
    price: number;
    foodType: [string];
    description: string;
    category: string;
    readyTime: number;
    rating: number;
    images: [string];

}

const FoodSchema: Schema = new Schema({
    vendorId: { type: String }, // Corrected field name
    name: { type: String, required: true },
    price: { type: Number, required: true },
    foodType: { type: [String], required: true },
    description: { type: String, required: true },
    category: { type: String },
    readyTime: { type: Number },
    rating: { type: Number },
    images: { type: [String] },
}, {
    toJSON: {
        transform: (doc, ret) => {
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    },
    timestamps: true,
});

const Food = mongoose.model<FoodDoc>("food", FoodSchema);
export { Food }