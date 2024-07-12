import express from 'express';
import {
    createUser,
    deleteUser,
    getSingleUser,
    getUser,
    updateUser,
} from '../controllers/user.controller';

const router = express.Router();

router.get('/', getUser);
router.get('/:id', getSingleUser);
router.post('/', createUser);
router.put('/', updateUser);
router.delete('/:id', deleteUser);

export default router;
