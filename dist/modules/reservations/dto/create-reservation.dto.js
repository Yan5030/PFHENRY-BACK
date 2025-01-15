"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReservationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateReservationDto {
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.CreateReservationDto = CreateReservationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Almacena la fecha de la reserva, debe estar en formato YYYY-MM-DD",
        example: "2025-01-13"
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Almacena el horario de la reserva, debe estar en formato HH:mm",
        example: "19:30"
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Almacena la cantidad de personas que iran a la reserva",
        example: 20
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(50),
    __metadata("design:type", Number)
], CreateReservationDto.prototype, "guest", void 0);
//# sourceMappingURL=create-reservation.dto.js.map