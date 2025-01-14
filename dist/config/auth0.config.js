"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth0Config = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: '.env.development' });
if (!process.env.AUTH0_SECRET || !process.env.AUTH0_BASE_URL || !process.env.AUTH0_CLIENT_ID || !process.env.AUTH0_ISSUER_BASE_URL) {
    throw new Error('Missing required Auth0 environment variables');
}
exports.auth0Config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
};
//# sourceMappingURL=auth0.config.js.map