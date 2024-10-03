import mongoose from "mongoose";
import { roles } from "../constants/roles";
import { TUser } from "../types/models/user";

const UserSchema = new mongoose.Schema<TUser>({
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: Number,
            required: true,
            default: roles.user,
            enum: [roles.admin, roles.user]
        },
        bookmarks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Bookmark"
            }
        ],
        languages : [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Language"
            }
        ],
        payments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Payment"
            }
        ],
        plan: {
            type: String,
            enum: ["free", "basic", "premium"],
            default: "free"
        },
        status: {
            type: String,
            enum: ["active", "inactive", "blocked"],
            default: "active"
        },
        verified: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model<TUser>("User", UserSchema)