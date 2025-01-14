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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const roles_enum_1 = require("../../enum/roles.enum");
const create_user_partial_dto_1 = require("../users/dto/create-user-partial.dto");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(jwtService, usersService) {
        this.jwtService = jwtService;
        this.usersService = usersService;
    }
    async signup(createUserDto) {
        const useremail = await this.usersService.getOneByEmail(createUserDto.email);
        console.log('Correo de usuario:', useremail);
        if (useremail) {
            throw new common_1.BadRequestException('El correo ya se encuentra registrado');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        if (!hashedPassword) {
            throw new common_1.BadRequestException('Error al encriptar la contraseña');
        }
        const userSave = {
            ...createUserDto,
            password: hashedPassword,
        };
        return await this.usersService.create(userSave);
    }
    async signin(signinAuthDto) {
        try {
            const { email, password } = signinAuthDto;
            const user = await this.usersService.getOneByEmail(signinAuthDto.email);
            if (!user) {
                throw new common_1.BadRequestException('Usuario no existe');
            }
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                throw new common_1.BadRequestException('Credenciales incorrectas');
            }
            const token = this.jwtService.sign({
                sub: user.id,
                email: user.email,
                roles: [user.role],
            });
            const { password: _, ...userWithoutPassword } = user;
            return { message: 'Inicio de sesión exitoso', user: userWithoutPassword, token };
        }
        catch (error) {
            console.error('Error en signin:', error.message);
            throw new common_1.BadRequestException('Error al iniciar sesión');
        }
    }
    async validateUserWithAuth0(payload) {
        let user = await this.usersService.getOneByEmail(payload.email);
        if (!user) {
            const createUserDto = new create_user_partial_dto_1.CreateUserPartialDto({
                name: payload.name,
                email: payload.email,
                password: '',
                address: 'default address',
                image_url: payload.picture || 'http://example.com',
                role: roles_enum_1.Role.User,
            });
            await this.usersService.create(user);
        }
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_service_1.UsersService])
], AuthService);
//# sourceMappingURL=auth.service.js.map