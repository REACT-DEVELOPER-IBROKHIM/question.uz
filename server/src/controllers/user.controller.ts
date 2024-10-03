import User from "../models/User";
import { Request, Response } from "express";
import { AppError } from "../errors";
import crypto from "crypto";
import { IUserController } from "../types/models/user";
import Otp from "../models/Otp";
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "../utils/mail-sender";
import { log } from "../config";

class UserController implements IUserController {
    async getAllUsers(_: Request, res: Response) : Promise<Response<any, Record<string, any>>> {
        try{
            const users = await User.find();
            return res.status(200).json(users);
        }
        catch(error){
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    status: 'error',
                    message: error.message
                });
            }
            log("LOG ERROR: ----> ", error);
            return res.status(500).json({
                status: 'error',
                message: 'Internal Server Error'
            });
        }
    }

    async signUp(req: Request, res: Response) : Promise<Response<any, Record<string, any>>> {
        try{
            const { firstName, email, password} = req.body;

            let user =  await User.findOne({email});

            if(user?.verified) return res.status(400).json({ message: "User already exists", payload: user })
        
            if(user) return res.status(400).json({ message: "User already registered please verify your email", payload: user });

            const otp = crypto.randomInt(100000, 999999).toString();

            const createOtpDocument = async (email: string, otp: string) => {
                try {
                    const newOtp = await Otp.create({ email, otp });
                    log("New document saved to the database", newOtp);
                    await sendVerificationEmail(newOtp.email, newOtp.otp);
                    return newOtp;
                }
                catch (error) {
                    if (error instanceof AppError) {
                        return res.status(error.statusCode).json({
                            status: 'error',
                            message: error.message
                        });
                    }
                    log("LOG ERROR: ----> ", error);
                    return res.status(500).json({
                        status: 'error',
                        message: 'Internal Server Error'
                    });
                }
            };

            await createOtpDocument(email, otp);

            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashPassword = bcrypt.hashSync(password, salt);
            user = await User.create({ firstName, email, password: hashPassword });

            return res.json({ message: "Successfully created new user" });
        }
        catch(error){
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    status: 'error',
                    message: error.message
                });
            }
            log("LOG ERROR: ----> ", error);
            
            return res.status(500).json({
                status: 'error',
                message: 'Internal Server Error'
            });
        }
    }
}

export default new UserController();