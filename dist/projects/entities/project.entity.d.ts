import { Category } from './category.entity';
export declare class Project {
    id: string;
    title: string;
    description: string;
    image: string;
    DemoLink: string;
    githubLink: string;
    categories: Category[];
    Technologies: string[];
    projectType: string[];
    generateId(): void;
}
