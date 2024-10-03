import { TPayment } from '../types/models/user';
import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema<TPayment>({
        transactionId: {
            type: String,
            required: true
        },
        user : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        amount : {
            type: Number,
            min: 0
        },
        status: {
            type: String,
            enum: ["unpaid", "paid"],
            default: "unpaid"
        },
        lastPaymentDate: {
            type: Date
        },
        nextPaymentDate: {
            type: Date
        },
        method: {
            type: String,
            default: "card"
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<TPayment>("Payment", PaymentSchema)