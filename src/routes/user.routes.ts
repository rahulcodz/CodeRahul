import express from 'express';
import {
    createUser,
    deleteUser,
    getSingleUser,
    getUser,
    updateUser,
} from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.get('/', getUser);
userRouter.get('/:id', getSingleUser);
userRouter.post('/', createUser);
userRouter.put('/', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;
