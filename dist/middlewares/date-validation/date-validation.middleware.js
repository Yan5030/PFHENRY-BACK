"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateValidationMiddleware = void 0;
const common_1 = require("@nestjs/common");
const dayjs = require("dayjs");
let DateValidationMiddleware = class DateValidationMiddleware {
    use(req, res, next) {
        const { date, time } = req.body;
        if (date && time) {
            if (!dayjs(date, 'YYYY-MM-DD', true).isValid()) {
                throw new common_1.BadRequestException('La fecha no está en formato YYYY-MM-DD');
            }
            if (!dayjs().isBefore(dayjs(date)) && !dayjs().isSame(dayjs(date), 'day')) {
                throw new common_1.BadRequestException('La fecha ingresada no es válida');
            }
            if (time.length !== 5) {
                throw new common_1.BadRequestException('Error al ingresar la hora, debe tener hora y minutos');
            }
            const now = dayjs().startOf('minute');
            const horaClienteDayJs = dayjs()
                .hour(parseInt(time.split(':')[0]))
                .minute(parseInt(time.split(':')[1]))
                .second(0);
            if (dayjs().isSame(dayjs(date), 'day') && horaClienteDayJs.isBefore(now)) {
                throw new common_1.BadRequestException('La hora es anterior a la actual');
            }
            next();
        }
        else {
            next();
        }
    }
};
exports.DateValidationMiddleware = DateValidationMiddleware;
exports.DateValidationMiddleware = DateValidationMiddleware = __decorate([
    (0, common_1.Injectable)()
], DateValidationMiddleware);
//# sourceMappingURL=date-validation.middleware.js.map