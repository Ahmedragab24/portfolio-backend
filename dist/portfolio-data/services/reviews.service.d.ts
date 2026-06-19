import { Repository } from 'typeorm';
import { Review } from '../../reviews/review.entity';
export declare class ReviewsService {
    private readonly reviewRepository;
    constructor(reviewRepository: Repository<Review>);
    findAll(): Promise<{
        $id: string;
        $createdAt: Date;
        name: string;
        avatar: string;
        rating: number;
        review: string;
    }[]>;
    findOne(id: string): Promise<{
        $id: string;
        $createdAt: Date;
        name: string;
        avatar: string;
        rating: number;
        review: string;
    }>;
    create(data: any): Promise<{
        $id: string;
        $createdAt: Date;
        name: string;
        avatar: string;
        rating: number;
        review: string;
    }>;
    update(id: string, data: any): Promise<{
        $id: string;
        $createdAt: Date;
        name: string;
        avatar: string;
        rating: number;
        review: string;
    }>;
    delete(id: string): Promise<boolean>;
    private mapReview;
}
