import { NextResponse } from 'next/server';
import { PUBLIC_ROUTES, AUTH_ROUTES, HOME_PAGE, LOGIN_PAGE } from "@/utils/routes";

// Middleware Logic
export function middleware({ nextUrl, cookies }) {
    const user = cookies.get("user")?.value;

    const isLoggedIn = !!user;

    console.log("ROUTE: ", nextUrl.pathname);
    console.log("isLoggedIn: ", isLoggedIn);

    const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
    const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

    if (isAuthRoute) {
        if (isLoggedIn) return NextResponse.redirect(new URL(HOME_PAGE, nextUrl));

        return null;
    }

    if (!isLoggedIn && !isPublicRoute) return NextResponse.redirect(new URL(LOGIN_PAGE, nextUrl));

    return null;
};

// Routes which will invoke the middleware (all routes)
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};