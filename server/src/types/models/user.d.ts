import {Response, Request} from "express";

export type TUser = {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    role: number;
    bookmarks: mongoose.Types.ObjectId[];
    languages: mongoose.Types.ObjectId[];
    payments: mongoose.Types.ObjectId[];
    plan: "free" | "basic" | "premium";
    status: "active" | "inactive" | "blocked";
    verified: boolean;
}

export type TPayment = {
    transactionId: string;
    user: mongoose.Types.ObjectId;
    amount: number;
    status: "unpaid" | "paid";
    lastPaymentDate: Date;
    nextPaymentDate: Date;
    method: "card" | "paypal";
}

export type TBookmark = {
    user: mongoose.Types.ObjectId;
    question: mongoose.Types.ObjectId;
}

export type TUserPayloadInToken = {
    _id: string;
    role: number;
}

export interface IUserController {
    getAllUsers: (req: Request, res: Response, next: NextFunction) => Promise<Response>;
    signUp: (req: Request, res: Response, next: NextFunction) => Promise<Response>;
}