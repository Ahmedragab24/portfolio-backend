import { StatisticsService } from '../services/statistics.service';
export declare class StatisticsController {
    private readonly statsService;
    constructor(statsService: StatisticsService);
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
    create(body: any): Promise<{
        $id: string;
        $createdAt: Date;
        title: string;
        arTitle: string;
        number: number;
    }>;
    update(id: string, body: any): Promise<{
        $id: string;
        $createdAt: Date;
        title: string;
        arTitle: string;
        number: number;
    }>;
    remove(id: string): Promise<boolean>;
}
