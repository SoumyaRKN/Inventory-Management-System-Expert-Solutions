import { connection, connect } from 'mongoose';

// Model Schema
import User from './User';
import Inventory from './Inventory';

export const dbConnect = async () => {
    if (!process.env.MONGODB_URI) return console.log("Please define the MONGODB_URI environment variable inside .env file.");
    if (connection.readyState === 1) return console.log("MongoDB already connected.");

    connection.once("open", () => console.log("MongoDB Connected."));

    return await connect(process.env.MONGODB_URI);
};

export const dbCloseConnection = async () => {
    console.log("MongoDB Disconnected.");
    return await connection.close();
};