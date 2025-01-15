"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: '.env.development' });
exports.typeOrmConfig = {
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || '123456',
    database: process.env.DATABASE_NAME || 'hogwarts_bar',
    autoLoadEntities: true,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    migrations: ['dist/migrations/*{.js,.ts}'],
    synchronize: true,
    logging: true,
};
//# sourceMappingURL=typeOrm.config.js.map