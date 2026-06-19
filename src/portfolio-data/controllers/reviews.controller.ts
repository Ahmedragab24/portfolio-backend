import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ReviewsService } from '../services/reviews.service';
import { AuthGuard } from '../../auth/auth.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  async findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(id);
  }

  // Public review creation (e.g. from testimonials form on user's portfolio site)
  @Post()
  async create(@Body() body: any) {
    return this.reviewsService.create(body);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.reviewsService.update(id, body);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.reviewsService.delete(id);
  }
}
