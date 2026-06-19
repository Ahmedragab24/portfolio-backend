export interface SocialMediaItem {
    name: string;
    link: string;
    icon: string;
}
export declare class About {
    id: string;
    name: string;
    arabicName: string;
    position: string;
    arabicPosition: string;
    description: string;
    arabicDescription: string;
    CV: string;
    email: string;
    socialMedia: SocialMediaItem[];
    createdAt: Date;
    updatedAt: Date;
    generateId(): void;
}
