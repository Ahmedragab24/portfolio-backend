import { Repository } from 'typeorm';
import { Statistics } from '../../statistics/statistics.entity';
export declare class StatisticsService {
    private readonly statsRepository;
    constructor(statsRepository: Repository<Statistics>);
    findAll(): Promise<{
        $id: string;
        $createdAt: Date;
        title: string;
        arTitle: string;
        number: number;
    }[]>;
    findOne(id: string): Promise<{
        $id: string;
        $createdAt: Date;
        title: string;
        arTitle: string;
        number: number;
    }>;
    create(data: any): Promise<{
        $id: string;
        $createdAt: Date;
        title: string;
        arTitle: string;
        number: number;
    }>;
    update(id: string, data: any): Promise<{
        $id: string;
        $createdAt: Date;
        title: string;
        arTitle: string;
        number: number;
    }>;
    delete(id: string): Promise<boolean>;
    private mapStats;
}
