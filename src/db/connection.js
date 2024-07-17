import 'dotenv/config';
import mongoose from 'mongoose';

const uri = process.env.DATABASE_URL;

export async function connect() {
    try {
        await mongoose.connect(uri, {});
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection falied:', error);
        process.exit(1);
    }
}