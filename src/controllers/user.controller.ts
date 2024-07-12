import { Request, Response } from 'express';
import UserModel from '../models/user.model';

interface IUser {
    username: string;
    email: string;
    age?: number;
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
};

export const getSingleUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user: IUser | null = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

export const createUser = async (req: Request, res: Response) => {
    console.log(req.body);
    try {
        const newUser = await UserModel.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error creating user' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { name, email, age, id } = req.body;
    try {
        const updatedUser: IUser | null = await UserModel.findByIdAndUpdate(
            id,
            { name, email, age },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedUser: IUser | null = await UserModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};
