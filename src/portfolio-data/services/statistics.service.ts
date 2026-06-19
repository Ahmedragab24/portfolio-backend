import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Statistics } from '../../statistics/statistics.entity';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Statistics)
    private readonly statsRepository: Repository<Statistics>,
  ) {}

  async findAll() {
    const list = await this.statsRepository.find();
    return list.map(s => this.mapStats(s));
  }

  async findOne(id: string) {
    const stats = await this.statsRepository.findOne({ where: { id } });
    if (!stats) throw new NotFoundException(`Statistics with ID ${id} not found`);
    return this.mapStats(stats);
  }

  async create(data: any) {
    const stats = this.statsRepository.create(data as Partial<Statistics>);
    const saved = await this.statsRepository.save(stats);
    return this.mapStats(saved);
  }

  async update(id: string, data: any) {
    const stats = await this.statsRepository.findOne({ where: { id } });
    if (!stats) throw new NotFoundException(`Statistics with ID ${id} not found`);
    Object.assign(stats, data);
    const saved = await this.statsRepository.save(stats);
    return this.mapStats(saved);
  }

  async delete(id: string) {
    const stats = await this.statsRepository.findOne({ where: { id } });
    if (!stats) throw new NotFoundException(`Statistics with ID ${id} not found`);
    await this.statsRepository.remove(stats);
    return true;
  }

  private mapStats(stats: Statistics) {
    return {
      $id: stats.id,
      $createdAt: stats.createdAt,
      title: stats.title,
      arTitle: stats.arTitle,
      number: stats.number,
    };
  }
}
