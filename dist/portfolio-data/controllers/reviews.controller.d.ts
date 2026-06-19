import { ReviewsService } from '../services/reviews.service';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
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
    create(body: any): Promise<{
        $id: string;
        $createdAt: Date;
        name: string;
        avatar: string;
        rating: number;
        review: string;
    }>;
    update(id: string, body: any): Promise<{
        $id: string;
        $createdAt: Date;
        name: string;
        avatar: string;
        rating: number;
        review: string;
    }>;
    remove(id: string): Promise<boolean>;
}
