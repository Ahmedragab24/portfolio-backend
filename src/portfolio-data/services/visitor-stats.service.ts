import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VisitorStats } from '../../visitor-stats/visitor-stats.entity';

@Injectable()
export class VisitorStatsService {
  private readonly DOCUMENT_ID = 'total_visits';

  constructor(
    @InjectRepository(VisitorStats)
    private readonly statsRepository: Repository<VisitorStats>,
  ) {}

  async getStats() {
    let stats = await this.statsRepository.findOne({ where: { id: this.DOCUMENT_ID } });
    if (!stats) {
      stats = this.statsRepository.create({
        id: this.DOCUMENT_ID,
        total_visits: 0,
      });
      stats = await this.statsRepository.save(stats);
    }
    return this.mapStats(stats);
  }

  async increment() {
    let stats = await this.statsRepository.findOne({ where: { id: this.DOCUMENT_ID } });
    if (!stats) {
      stats = this.statsRepository.create({
        id: this.DOCUMENT_ID,
        total_visits: 1,
      });
    } else {
      stats.total_visits += 1;
    }
    const saved = await this.statsRepository.save(stats);
    return this.mapStats(saved);
  }

  private mapStats(stats: VisitorStats) {
    return {
      $id: stats.id,
      total_visits: stats.total_visits,
      last_updated: stats.last_updated,
    };
  }
}
