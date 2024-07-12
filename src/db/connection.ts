import 'dotenv/config';
import mongoose from 'mongoose';

const uri: string = process.env.DATABASE_URL || '';

export async function connect() {
    try {
        await mongoose.connect(uri, {});
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}
