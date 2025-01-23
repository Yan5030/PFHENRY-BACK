 import { config as dotenvConfig } from 'dotenv';

// Cargar las variables de entorno desde el archivo .env.development
dotenvConfig({ path: '.env' });

// Validar que las variables de entorno necesarias están presentes
if (!process.env.AUTH0_SECRET || !process.env.AUTH0_BASE_URL || !process.env.AUTH0_CLIENT_ID || !process.env.AUTH0_ISSUER_BASE_URL) {
    throw new Error('Missing required Auth0 environment variables');
}

// Configuración de Auth0 exportada
export const auth0Config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
};
 