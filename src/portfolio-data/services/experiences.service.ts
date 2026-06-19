import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Experience } from '../../experiences/experience.entity';

@Injectable()
export class ExperiencesService {
  constructor(
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
  ) {}

  async findAll() {
    const list = await this.experienceRepository.find();
    return list.map(e => this.mapExperience(e));
  }

  async findOne(id: string) {
    const experience = await this.experienceRepository.findOne({ where: { id } });
    if (!experience) throw new NotFoundException(`Experience with ID ${id} not found`);
    return this.mapExperience(experience);
  }

  async create(data: any) {
    const experience = this.experienceRepository.create(data as Partial<Experience>);
    const saved = await this.experienceRepository.save(experience);
    return this.mapExperience(saved);
  }

  async update(id: string, data: any) {
    const experience = await this.experienceRepository.findOne({ where: { id } });
    if (!experience) throw new NotFoundException(`Experience with ID ${id} not found`);
    Object.assign(experience, data);
    const saved = await this.experienceRepository.save(experience);
    return this.mapExperience(saved);
  }

  async delete(id: string) {
    const experience = await this.experienceRepository.findOne({ where: { id } });
    if (!experience) throw new NotFoundException(`Experience with ID ${id} not found`);
    await this.experienceRepository.remove(experience);
    return true;
  }

  private mapExperience(experience: Experience) {
    return {
      $id: experience.id,
      $createdAt: experience.createdAt,
      title: experience.title,
      arabicTitle: experience.arabicTitle,
      description: experience.description,
      arabicDescription: experience.arabicDescription,
      link: experience.link,
      titleLink: experience.titleLink,
      arabicTitleLink: experience.arabicTitleLink,
      motion: experience.motion,
      duration: experience.duration,
    };
  }
}
