import { Controller, Get, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { VisitorStatsService } from '../services/visitor-stats.service';

@Controller('visitor-stats')
export class VisitorStatsController {
  constructor(private readonly statsService: VisitorStatsService) {}

  @Get()
  async getStats() {
    return this.statsService.getStats();
  }

  @Post('increment')
  @HttpCode(HttpStatus.OK)
  async increment() {
    return this.statsService.increment();
  }
}
