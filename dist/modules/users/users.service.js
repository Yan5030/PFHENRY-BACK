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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const response_user_dto_1 = require("./dto/response-user.dto");
const dayjs = require("dayjs");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(createUserDto) {
        const userDb = await this.usersRepository.findOne({ where: { email: createUserDto.email } });
        console.log("Valor de user", userDb);
        if (userDb) {
            throw new common_1.BadRequestException("El correo ya esta registrado");
        }
        const newUser = this.usersRepository.create({
            ...createUserDto,
            create_at: dayjs().format("YYYY-MM-DD")
        });
        return this.usersRepository.save(newUser);
    }
    async findAll() {
        const users = await this.usersRepository.find();
        const usersNoPassword = users.map(user => new response_user_dto_1.ResponseUserDto(user));
        return usersNoPassword;
    }
    async findOneById(id) {
        const userDb = await this.usersRepository.findOne({ where: { id } });
        if (!userDb) {
            throw new common_1.BadRequestException("No se encuentran usuarios con la id ingresada.");
        }
        const userNoPassword = new response_user_dto_1.ResponseUserDto(userDb);
        return userNoPassword;
    }
    async update(id, updateUserDto) {
        const userDb = await this.usersRepository.findOne({ where: { id } });
        if (!userDb) {
            throw new common_1.BadRequestException("No se encontraron usuarios con la id ingresada");
        }
        const updateUser = Object.assign(userDb, updateUserDto);
        return await this.usersRepository.save(updateUser);
        ;
    }
    async remove(id) {
        const userDb = await this.usersRepository.findOne({ where: { id } });
        return await this.usersRepository.delete(id);
    }
    async getOneByEmail(email) {
        const userDb = await this.usersRepository.findOne({ where: { email } });
        if (!userDb) {
            throw new common_1.BadRequestException("No se encontraron usuarios con ese email");
        }
        return userDb;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map