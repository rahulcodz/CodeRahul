import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { connect } from './db/connection';
import 'dotenv/config';
import router from './routes/user.routes';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

connect();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.use('/users', router);

app.use('**', (req: Request, res: Response) => {
    res.send('No data found');
});

app.listen(PORT, () => {
    console.log('Server started on http://localhost:' + PORT);
});
