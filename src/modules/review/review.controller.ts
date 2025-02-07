import { Controller, Get, Post, Body, Put, Patch, Param, Delete, Req, HttpException, HttpStatus } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('review')
@ApiTags('Review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  async create(@Req() req, @Body() createReviewDto: CreateReviewDto) {
    const userId = req.user.id; 
    try {
      return this.reviewService.create(userId, createReviewDto);  
    } catch (error) {
      throw new HttpException(
        error.message || 'Error creating review',
        HttpStatus.BAD_REQUEST
      )
    }
    
  }

  @Get()
  async findAll() {
    return this.reviewService.findAll();
  }

   @Get(':id')
   async findOne(@Param('id') id: string) {
     return this.reviewService.findOne(id);
   }

  @Get('/user/:userId')
  async findByUserId(@Param('userId') userId: string) {
  try {
    return await this.reviewService.findByUserId(userId);
  } catch (error) {
    throw new HttpException(
      error.message || 'Error getting user reviews',
      HttpStatus.BAD_REQUEST
    );
  }
}

   @UseGuards(AuthGuard)
   @ApiBearerAuth()
   @Put(":reviewId")
   async update(@Req() req, @Param('reviewId') reviewId: string, @Body() updateReviewDto: UpdateReviewDto) {
     const userId = req.user.id; 
     try {
       return await this.reviewService.update(userId, reviewId, updateReviewDto);
     } catch (error) {
       throw new HttpException(
         error.message || 'Error updating review',
         HttpStatus.BAD_REQUEST
       )
     }
   }
}
