import { Project } from './project.entity';
export declare class Category {
    id: string;
    name: string;
    projects: Project[];
    generateId(): void;
}
