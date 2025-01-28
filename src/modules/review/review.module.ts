import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Review } from './entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Review ])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}