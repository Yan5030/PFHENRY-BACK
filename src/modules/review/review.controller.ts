import { Controller, Get, Post, Body, Put, Patch, Param, Delete, Req } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('review')
@ApiTags('Review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  async create(@Req() req, @Body() createReviewDto: CreateReviewDto) {
    const userId = req.user.id; // Obtenemos el ID del usuario autenticado
    return this.reviewService.create(userId, createReviewDto);
  }

  @Get()
  async findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.reviewService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Put()
  async update(@Req() req, @Body() updateReviewDto: UpdateReviewDto) {
    const userId = req.user.id; // Obtenemos el ID del usuario autenticado
    return this.reviewService.update(userId, updateReviewDto);
  }
}
