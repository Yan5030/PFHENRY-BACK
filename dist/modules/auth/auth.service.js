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
const auth_repository_1 = require("./auth.repository");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const users_repository_1 = require("../users/users.repository");
const roles_enum_1 = require("../../enum/roles.enum");
const create_user_partial_dto_1 = require("../users/dto/create-user-partial.dto");
let AuthService = class AuthService {
    constructor(authRepository, jwtService, userRepository) {
        this.authRepository = authRepository;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }
    getAllUsers() {
        return this.authRepository.findAll();
    }
    async signup(userAuthDto) {
        const useremail = this.authRepository.findByEmail(userAuthDto.email);
        if (useremail) {
            throw new common_1.BadRequestException('El correo ya se encuentra registrado');
        }
        if (userAuthDto.password !== userAuthDto.confirmPassword) {
            throw new common_1.BadRequestException('Las contraseñas no coinciden');
        }
        const hashedPassword = await bcrypt.hash(userAuthDto.password, 10);
        if (!hashedPassword) {
            throw new common_1.BadRequestException('Error al encriptar la contraseña');
        }
        const userSave = {
            ...userAuthDto,
            password: hashedPassword,
        };
        const { confirmPassword, ...userSaveWithoutPassword } = userSave;
        const newUser = await this.authRepository.create(userSave);
        return newUser;
    }
    async signin(signinAuthDto) {
        const user = this.authRepository.findByEmail(signinAuthDto.email);
        if (!user) {
            throw new common_1.BadRequestException('Usuario no encontrado');
        }
        const validPassword = await bcrypt.compare(signinAuthDto.password, user.password);
        if (!validPassword) {
            return { message: 'Credenciales incorrectas' };
        }
        const userPayload = {
            sub: user.id,
            id: user.id,
            email: user.email,
            roles: [user.role]
        };
        console.log(userPayload);
        const token = this.jwtService.sign(userPayload);
        return { message: 'Inicio de sesión exitoso', user, token };
    }
    async validateUserWithAuth0(payload) {
        let user = await this.userRepository.findOneByEmail(payload.email);
        if (!user) {
            const createUserDto = new create_user_partial_dto_1.CreateUserPartialDto({
                name: payload.name,
                email: payload.email,
                password: '',
                address: 'default address',
                image_url: payload.picture || 'http://example.com',
                role: roles_enum_1.Role.User,
            });
            await this.userRepository.saveUser(user);
        }
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_repository_1.AuthRepository,
        jwt_1.JwtService,
        users_repository_1.UserRepository])
], AuthService);
//# sourceMappingURL=auth.service.js.map