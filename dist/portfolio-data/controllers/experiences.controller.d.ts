import { ExperiencesService } from '../services/experiences.service';
export declare class ExperiencesController {
    private readonly experiencesService;
    constructor(experiencesService: ExperiencesService);
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
    create(body: any): Promise<{
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
    update(id: string, body: any): Promise<{
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
    remove(id: string): Promise<boolean>;
}
