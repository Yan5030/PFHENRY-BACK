"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcryptjs"));
const roles_enum_1 = require("../../enum/roles.enum");
const create_user_partial_dto_1 = require("../users/dto/create-user-partial.dto");
const users_service_1 = require("../users/users.service");
const response_user_dto_1 = require("../users/dto/response-user.dto");
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
        if (createUserDto.password !== createUserDto.ConfirmPassword) {
            throw new common_1.BadRequestException("password y confirm password deben ser iguales");
        }
        const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);
        if (!hashedPassword) {
            throw new common_1.BadRequestException('Error al encriptar la contraseña');
        }
        const userSave = await this.usersService.create({ ...createUserDto, password: hashedPassword });
        return userSave;
    }
    async signin(signinAuthDto) {
        try {
            const { email, password } = signinAuthDto;
            const user = await this.usersService.getOneByEmail(email);
            if (!user) {
                throw new common_1.BadRequestException('Credenciales incorrectas');
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                throw new common_1.BadRequestException('Credenciales incorrectas');
            }
            const payload = {
                sub: user.id,
                id: user.id,
                email: user.email,
                roles: [user.role],
            };
            const loggin = true;
            const token = this.jwtService.sign(payload);
            const responseUser = new response_user_dto_1.ResponseUserDto(user);
            return { token: token, user: responseUser, loggin };
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