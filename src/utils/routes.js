/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication.
 * @param {String[]} PUBLIC_ROUTES
 */
export const PUBLIC_ROUTES = [
    '/authentication/login',
];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to home page.
 * @param {String[]} AUTH_ROUTES
 */
export const AUTH_ROUTES = [
    '/authentication/login',
];

/**
 * The default redirect path after logging in.
 * @param {String} HOME_PAGE
 */
export const HOME_PAGE = '/';

/**
 * The default redirect path after logout or session expiry.
 * @param {String} LOGIN_PAGE
 */
export const LOGIN_PAGE = '/authentication/login';

/**
 * An object of routes that are used for api's.
 * @param {Object} API_ROUTES
 */
export const API_ROUTES = {
    inventory: { get: "/api/inventory", }, // List :- "/api/inventory", Details:- "/api/inventory/{itemId}"
};