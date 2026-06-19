import { VisitorStatsService } from '../services/visitor-stats.service';
export declare class VisitorStatsController {
    private readonly statsService;
    constructor(statsService: VisitorStatsService);
    getStats(): Promise<{
        $id: string;
        total_visits: number;
        last_updated: Date;
    }>;
    increment(): Promise<{
        $id: string;
        total_visits: number;
        last_updated: Date;
    }>;
}
