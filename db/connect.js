import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config()

const { DB_HOST } = process.env;

const connectMongo = async () => {
    await mongoose.connect(DB_HOST);
}

export default connectMongo;

