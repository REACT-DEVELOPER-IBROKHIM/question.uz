import express from 'express'
import User from '../../controllers/user.controller';
import { Request, Response } from 'express';

const router = express.Router();

router
    .get("/", async (req: Request, res: Response) => { await User.getAllUsers(req, res)})
    .post("/signup", async (req: Request, res: Response) => { await User.signUp(req, res) })

export default router