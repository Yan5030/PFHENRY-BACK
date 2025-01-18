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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationsService = void 0;
const common_1 = require("@nestjs/common");
const dayjs_1 = __importDefault(require("dayjs"));
const typeorm_1 = require("@nestjs/typeorm");
const reservation_entity_1 = require("./entities/reservation.entity");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
let ReservationsService = class ReservationsService {
    constructor(reservationRepository, usersService) {
        this.reservationRepository = reservationRepository;
        this.usersService = usersService;
    }
    async create(id, createReservationDto) {
        const create_at = (0, dayjs_1.default)().format("YYYY-MM-DD");
        const user = await this.usersService.findOneById(id);
        const newReservation = this.reservationRepository.create({ ...createReservationDto, create_at: create_at, userId: user });
        return this.reservationRepository.save(newReservation);
    }
    async findAll() {
        const reservations = await this.reservationRepository.find({ relations: { userId: true } });
        return reservations;
    }
    async findOneById(id) {
        const reservation = await this.reservationRepository.findOne({ where: { id } });
        if (!reservation) {
            throw new common_1.BadRequestException("No hay reservas con la id ingresada");
        }
        return reservation;
    }
    async update(id, updateReservationDto) {
        const reservation = await this.reservationRepository.findOne({ where: { id } });
        if (!reservation) {
            throw new common_1.BadRequestException("El id ingresado no es correcto");
        }
        const updateReservation = Object.assign(reservation, updateReservationDto);
        return this.reservationRepository.save(updateReservation);
    }
    async remove(id) {
        const reservation = await this.reservationRepository.findOne({ where: { id } });
        return this.reservationRepository.delete(id);
    }
};
exports.ReservationsService = ReservationsService;
exports.ReservationsService = ReservationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reservation_entity_1.Reservation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], ReservationsService);
//# sourceMappingURL=reservations.service.js.map