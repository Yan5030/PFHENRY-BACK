 import { config as dotenvConfig } from 'dotenv';


dotenvConfig({ path: '.env' });

if (!process.env.AUTH0_SECRET || !process.env.AUTH0_BASE_URL || !process.env.AUTH0_CLIENT_ID || !process.env.AUTH0_ISSUER_BASE_URL) {
    throw new Error('Missing required Auth0 environment variables');
}

export const auth0Config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
};
 