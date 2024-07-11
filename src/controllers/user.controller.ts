import { Request, Response } from 'express';
import UserModel from '../models/user.model';

export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = await UserModel.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find();
        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
}