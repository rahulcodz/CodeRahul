import express from 'express';
import 'dotenv/config';
import userRouter from './routes/user.routes.js';
import bodyParser from 'body-parser';
import cors from "cors";
import { connect } from './db/connection.js';

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

connect();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/users', userRouter);

app.use('**', (req, res) => {
    res.send('No data found');
});

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT);
});
