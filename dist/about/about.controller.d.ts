import { AboutService } from './about.service';
export declare class AboutController {
    private readonly aboutService;
    constructor(aboutService: AboutService);
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
    create(body: any): Promise<{
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
    update(id: string, body: any): Promise<{
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
}
