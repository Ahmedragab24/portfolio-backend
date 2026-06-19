import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { StatisticsService } from '../services/statistics.service';
import { AuthGuard } from '../../auth/auth.guard';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statsService: StatisticsService) {}

  @Get()
  async findAll() {
    return this.statsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.statsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() body: any) {
    return this.statsService.create(body);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.statsService.update(id, body);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.statsService.delete(id);
  }
}
