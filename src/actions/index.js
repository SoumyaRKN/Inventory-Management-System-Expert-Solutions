"use server"

import { hash } from 'bcrypt';
import { cookies } from 'next/headers';
import { dbConnect, dbCloseConnection } from '@/models';
import User from '@/models/User';

export const getCurrentUser = async () => {
    try {
        const user = cookies().get("user")?.value;

        if (!user) return { status: false, error: "Session expired. Please relogin!" };

        return { status: true, value: JSON.parse(user) };
    } catch (error) {
        console.log(error);
        return { status: false, error: error.message };
    }
};

export const createSuperAdmin = async () => {
    try {
        const db = await dbConnect();

        const superAdmin = await User.findOne({ username: "admin" });
        console.log(superAdmin);

        if (superAdmin) return { status: false, message: "Super admin already exists!" };

        const password = await hash("12345", 10);
        const userToCreate = new User({ name: "Super Admin", username: "admin", password, status: true, isAdmin: true });
        const user = await userToCreate.save();

        return { status: true, message: "Super admin created successfully!" };
    } catch (error) {
        console.log(error);
        return { status: false, error: error.message };
    } finally {
        // await dbCloseConnection();
    }
};