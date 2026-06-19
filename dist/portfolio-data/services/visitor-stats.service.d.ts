import { Repository } from 'typeorm';
import { VisitorStats } from '../../visitor-stats/visitor-stats.entity';
export declare class VisitorStatsService {
    private readonly statsRepository;
    private readonly DOCUMENT_ID;
    constructor(statsRepository: Repository<VisitorStats>);
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
    private mapStats;
}
