"use server"

import { compare } from 'bcrypt';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { HOME_PAGE, LOGIN_PAGE } from '@/utils/routes';
import { dbConnect, dbCloseConnection } from '@/models';
import User from '@/models/User';

export const authenticate = async (credentials) => {
    try {
        const db = await dbConnect();

        const user = await User.findOne({ username: credentials.username }).lean();
        console.log(user);

        if (!user) return { status: false, error: "Invalid Credentials!" };
        if (!user.status) return { status: false, error: "User is inactive!" };

        const comparePassword = await compare(credentials.password, user.password);

        if (!comparePassword) return { status: false, error: "Invalid Credentials!" };

        const { password, ...userData } = user;
        const expiryTime = new Date().getTime() + (3 * 60 * 60 * 1000); // Expires after 3 hours
        const userCookie = { name: "user", value: JSON.stringify(userData), httpOnly: true, secure: true, expires: expiryTime };
        cookies().set(userCookie);
    } catch (error) {
        console.log(error);
        cookies().delete("user");
        return { status: false, error: error.message };
    } finally {
        // await dbCloseConnection();
    }

    redirect(HOME_PAGE);
};

export const logout = async () => {
    try {
        console.log("Logout called");
        cookies().delete("user");
    } catch (error) {
        console.log(error);
    } finally {
        redirect(LOGIN_PAGE);
    }
};