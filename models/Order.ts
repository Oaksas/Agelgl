import mongoose, { Schema, Document } from "mongoose";

export interface OrderDoc extends Document {

    orderId: string;
    vendorId: string;
    items: [any];
    totalAmount: number;
    orderDate: Date;
    paidThrough: string;
    paymentResponse: string;
    orderStatus: string;
    remark: string;
    deliveryId: string;
    appliedOffers: boolean;
    offerId: string;
    readyTime: number



}

const OrderSchema: Schema = new Schema({
    orderId: { type: String, required: true },
    vendorId: { type: Schema.Types.ObjectId, ref: "vendor", required: true },
    items: [
        {
            food: { type: Schema.Types.ObjectId, ref: "food", required: true },
            unit: { type: Number, required: true }
        }
    ],
    totalAmount: { type: Number, required: true },
    orderDate: { type: Date },
    paidThrough: { type: String },
    paymentResponse: { type: String },
    orderStatus: { type: String },
    remark: { type: String },
    deliveryId: { type: String },
    appliedOffers: { type: Boolean },
    offerId: { type: String },
    readyTime: { type: Number }

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

const Order = mongoose.model<OrderDoc>("order", OrderSchema);
export { Order }