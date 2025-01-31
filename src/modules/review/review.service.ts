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
    const user = await this.userRepository.findOne({where: {id: userId}});
    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }
  
    const review = this.reviewRepository.create({
      ...createReviewDto,
      user,
    });
    const savedReview = await this.reviewRepository.save(review);

    return {
      ...savedReview,
      user: { id: user.id, name: user.name }
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

  async findByUserId(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['reviews'], // Incluimos las reseñas relacionadas
    });
  
    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }
    console.log(user.reviews);
    return user.reviews;
  }

   async update(userId: string, reviewId: string ,updateReviewDto: UpdateReviewDto) {
     const review = await this.reviewRepository.findOne({where: {id: reviewId, user: {id: userId}}, relations: ['user']});

     if (!review) {
       throw new BadRequestException('Usuario no encontrado o no pertenece al usuario');
     }
    
     const updateReview = this.reviewRepository.merge(review, updateReviewDto);

     const saved = await this.reviewRepository.save(updateReview);

     return {...saved, user: { id: review.user.id, name: review.user.name }};
   }
}
