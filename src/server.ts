import express, { Request, Response } from 'express';
import { connect } from './db/connection';
import 'dotenv/config'
import { createUser } from './controllers/user.controller';

const app = express();
const port = process.env.PORT || 8000;

const router = express.Router();

connect()

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

router.post('/users', createUser);
router.get('/users', createUser);

app.listen(port, () => {
    console.log('Server started');
});
