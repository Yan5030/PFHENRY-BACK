import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private readonly reviewRepository: Repository<Review>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(userId: string, createReviewDto: CreateReviewDto) {
    const user = await this.userRepository.findOne({where: {id: userId}, relations: ['review']});
    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }
    if (user.review) {
      throw new BadRequestException('Ya tienes una reseña activa, modifica la reseña existente');
    }
    const review = this.reviewRepository.create({
      ...createReviewDto,
      user,
    });
    const savedReview = await this.reviewRepository.save(review);

    return {
      ...savedReview,
      user: { id: user.id }
    }
  }

  async findAll() {
    const reviews = await this.reviewRepository.find({relations: ['user']});

    return reviews.map(review => ({
      ...review,
      user: { id: review.user.id }
    }));
  }

  async findOne(id: string) {
    const review = await this.reviewRepository.findOne({where: {id}, relations: ['user']});
    if (!review) {
      throw new BadRequestException('Reseña no encontrada');
    }

    return {
      ...review, user: { id: review.user.id }
    }
  }

  async update(userId: string, updateReviewDto: UpdateReviewDto) {
    const user = await this.userRepository.findOne({where: {id: userId}, relations: ['review']});
    if (!user || !user.review) {
      throw new Error('Usuario o reseña no encontrada');
    }
    const updateRevie = this.reviewRepository.merge(user.review, updateReviewDto);
    return await this.reviewRepository.save(updateRevie);
  }
}
