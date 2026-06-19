import { Repository } from 'typeorm';
import { Experience } from '../../experiences/experience.entity';
export declare class ExperiencesService {
    private readonly experienceRepository;
    constructor(experienceRepository: Repository<Experience>);
    findAll(): Promise<{
        $id: string;
        $createdAt: Date;
        title: string;
        arabicTitle: string;
        description: string;
        arabicDescription: string;
        link: string;
        titleLink: string;
        arabicTitleLink: string;
        motion: number;
        duration: number;
    }[]>;
    findOne(id: string): Promise<{
        $id: string;
        $createdAt: Date;
        title: string;
        arabicTitle: string;
        description: string;
        arabicDescription: string;
        link: string;
        titleLink: string;
        arabicTitleLink: string;
        motion: number;
        duration: number;
    }>;
    create(data: any): Promise<{
        $id: string;
        $createdAt: Date;
        title: string;
        arabicTitle: string;
        description: string;
        arabicDescription: string;
        link: string;
        titleLink: string;
        arabicTitleLink: string;
        motion: number;
        duration: number;
    }>;
    update(id: string, data: any): Promise<{
        $id: string;
        $createdAt: Date;
        title: string;
        arabicTitle: string;
        description: string;
        arabicDescription: string;
        link: string;
        titleLink: string;
        arabicTitleLink: string;
        motion: number;
        duration: number;
    }>;
    delete(id: string): Promise<boolean>;
    private mapExperience;
}
