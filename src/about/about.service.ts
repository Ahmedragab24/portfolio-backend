import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { About } from './about.entity';

@Injectable()
export class AboutService {
  constructor(
    @InjectRepository(About)
    private aboutRepository: Repository<About>,
  ) {}

  async getAbout() {
    const list = await this.aboutRepository.find();
    if (list.length === 0) {
      const defaultAbout = this.aboutRepository.create({
        name: 'Your Name',
        arabicName: 'اسمك',
        position: 'Your Position',
        arabicPosition: 'منصبك',
        description: 'Your description goes here.',
        arabicDescription: 'وصفك يذهب هنا.',
        CV: '',
        email: 'your.email@example.com',
        socialMedia: [
          {
            name: 'GitHub',
            link: 'https://github.com/yourusername',
            icon: 'github',
          },
        ],
      });
      const saved = await this.aboutRepository.save(defaultAbout);
      return this.mapAbout(saved);
    }
    return this.mapAbout(list[0]);
  }

  async updateAbout(id: string, data: any) {
    let about: About | null = null;
    if (id) {
      about = await this.aboutRepository.findOne({ where: { id } });
    }
    if (!about) {
      const list = await this.aboutRepository.find();
      if (list.length > 0) {
        about = list[0];
      }
    }

    if (!about) {
      about = this.aboutRepository.create(data as Partial<About>);
    } else {
      Object.assign(about, data);
    }

    const saved = await this.aboutRepository.save(about);
    return this.mapAbout(saved);
  }

  async createAbout(data: any) {
    const about = this.aboutRepository.create(data as Partial<About>);
    const saved = await this.aboutRepository.save(about);
    return this.mapAbout(saved);
  }

  private mapAbout(about: About) {
    return {
      $id: about.id,
      $createdAt: about.createdAt,
      $updatedAt: about.updatedAt,
      name: about.name,
      arabicName: about.arabicName,
      position: about.position,
      arabicPosition: about.arabicPosition,
      description: about.description,
      arabicDescription: about.arabicDescription,
      CV: about.CV,
      email: about.email,
      socialMedia: about.socialMedia || [],
    };
  }
}
