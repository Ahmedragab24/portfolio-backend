import { Repository } from 'typeorm';
import { About } from './about.entity';
export declare class AboutService {
    private aboutRepository;
    constructor(aboutRepository: Repository<About>);
    getAbout(): Promise<{
        $id: string;
        $createdAt: Date;
        $updatedAt: Date;
        name: string;
        arabicName: string;
        position: string;
        arabicPosition: string;
        description: string;
        arabicDescription: string;
        CV: string;
        email: string;
        socialMedia: import("./about.entity").SocialMediaItem[];
    }>;
    updateAbout(id: string, data: any): Promise<{
        $id: string;
        $createdAt: Date;
        $updatedAt: Date;
        name: string;
        arabicName: string;
        position: string;
        arabicPosition: string;
        description: string;
        arabicDescription: string;
        CV: string;
        email: string;
        socialMedia: import("./about.entity").SocialMediaItem[];
    }>;
    createAbout(data: any): Promise<{
        $id: string;
        $createdAt: Date;
        $updatedAt: Date;
        name: string;
        arabicName: string;
        position: string;
        arabicPosition: string;
        description: string;
        arabicDescription: string;
        CV: string;
        email: string;
        socialMedia: import("./about.entity").SocialMediaItem[];
    }>;
    private mapAbout;
}
