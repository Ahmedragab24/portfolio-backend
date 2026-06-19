import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../../reviews/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async findAll() {
    const list = await this.reviewRepository.find();
    return list.map(r => this.mapReview(r));
  }

  async findOne(id: string) {
    const review = await this.reviewRepository.findOne({ where: { id } });
    if (!review) throw new NotFoundException(`Review with ID ${id} not found`);
    return this.mapReview(review);
  }

  async create(data: any) {
    const review = this.reviewRepository.create(data as Partial<Review>);
    const saved = await this.reviewRepository.save(review);
    return this.mapReview(saved);
  }

  async update(id: string, data: any) {
    const review = await this.reviewRepository.findOne({ where: { id } });
    if (!review) throw new NotFoundException(`Review with ID ${id} not found`);
    Object.assign(review, data);
    const saved = await this.reviewRepository.save(review);
    return this.mapReview(saved);
  }

  async delete(id: string) {
    const review = await this.reviewRepository.findOne({ where: { id } });
    if (!review) throw new NotFoundException(`Review with ID ${id} not found`);
    await this.reviewRepository.remove(review);
    return true;
  }

  private mapReview(review: Review) {
    return {
      $id: review.id,
      $createdAt: review.createdAt,
      name: review.name,
      avatar: review.avatar,
      rating: review.rating,
      review: review.review,
    };
  }
}
