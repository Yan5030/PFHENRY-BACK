"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationsModule = void 0;
const common_1 = require("@nestjs/common");
const reservations_service_1 = require("./reservations.service");
const reservations_controller_1 = require("./reservations.controller");
const users_service_1 = require("../users/users.service");
const reservation_entity_1 = require("./entities/reservation.entity");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const date_validation_middleware_1 = require("../../middlewares/date-validation/date-validation.middleware");
let ReservationsModule = class ReservationsModule {
    configure(consumer) {
        consumer
            .apply(date_validation_middleware_1.DateValidationMiddleware)
            .forRoutes('reservations');
    }
};
exports.ReservationsModule = ReservationsModule;
exports.ReservationsModule = ReservationsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([reservation_entity_1.Reservation, user_entity_1.User])],
        controllers: [reservations_controller_1.ReservationsController],
        providers: [reservations_service_1.ReservationsService, users_service_1.UsersService],
        exports: [reservations_service_1.ReservationsService]
    })
], ReservationsModule);
//# sourceMappingURL=reservations.module.js.map