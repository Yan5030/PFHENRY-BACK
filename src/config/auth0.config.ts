import { config as dotenvConfig } from 'dotenv';

// Carga las variables de entorno desde el archivo `.env`
dotenvConfig({ path: '.env' });

// Validación de variables de entorno
if (
  !process.env.AUTH0_SECRET ||
  !process.env.AUTH0_BASE_URL ||
  !process.env.AUTH0_ISSUER_BASE_URL ||
  !process.env.AUTH0_AUDIENCE
) {
  throw new Error('Faltan variables de entorno requeridas para Auth0');
}

// Configuración exportada para Auth0
export const auth0Config = {
  secret: process.env.AUTH0_SECRET,             // Secreto para verificar tokens
  baseURL: process.env.AUTH0_BASE_URL,         // URL base de tu aplicación
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL, // URL del issuer (Auth0 tenant)
  audience: process.env.AUTH0_AUDIENCE,        // Identificador del API
};
