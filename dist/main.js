"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const express_openid_connect_1 = require("express-openid-connect");
const auth0_config_1 = require("./config/auth0.config");
const swagger_1 = require("@nestjs/swagger");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: '.env' });
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, express_openid_connect_1.auth)(auth0_config_1.auth0Config));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        skipMissingProperties: false,
        exceptionFactory: (errors) => {
            const errores = errors.map((error) => {
                return { property: error.property, constraints: error.constraints };
            });
            return new common_1.BadRequestException({ alert: "Se han detectado los siguientes errores", errors: errores });
        }
    }));
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Hogwarts API')
        .setDescription('Documentación de la API para manejar datos de la app de Hogwarts')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map