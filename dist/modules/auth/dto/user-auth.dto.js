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
exports.UserAuthDto = void 0;
const class_validator_1 = require("class-validator");
class UserAuthDto {
}
exports.UserAuthDto = UserAuthDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserAuthDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserAuthDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserAuthDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/, { message: 'La contraseña debe tener al menos una letra minúscula, una mayúscula, un número y un carácter especial de entre !@#$%^&*.' }),
    (0, class_validator_1.MinLength)(5),
    __metadata("design:type", String)
], UserAuthDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(5),
    __metadata("design:type", String)
], UserAuthDto.prototype, "confirmPassword", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserAuthDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserAuthDto.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['admin', 'user']),
    __metadata("design:type", String)
], UserAuthDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", String)
], UserAuthDto.prototype, "createad", void 0);
//# sourceMappingURL=user-auth.dto.js.map