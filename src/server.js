import express from 'express';
import 'dotenv/config';

const PORT = process.env.PORT || 8000;

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, Node.js with nodemon!');
});

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT);
});
