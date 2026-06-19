import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { Category } from './entities/category.entity';
export declare class ProjectsService {
    private projectRepository;
    private categoryRepository;
    constructor(projectRepository: Repository<Project>, categoryRepository: Repository<Category>);
    findAllCategories(): Promise<{
        $id: string;
        name: string;
    }[]>;
    findCategoryById(id: string): Promise<{
        $id: string;
        name: string;
    }>;
    createCategory(name: string): Promise<{
        $id: string;
        name: string;
    }>;
    updateCategory(id: string, name: string): Promise<{
        $id: string;
        name: string;
    }>;
    deleteCategory(id: string): Promise<boolean>;
    findAllProjects(): Promise<{
        $id: string;
        title: string;
        description: string;
        image: string;
        DemoLink: string;
        githubLink: string;
        Technologies: string[];
        projectType: string[];
        categories: {
            $id: string;
            name: string;
        }[];
    }[]>;
    findProjectById(id: string): Promise<{
        $id: string;
        title: string;
        description: string;
        image: string;
        DemoLink: string;
        githubLink: string;
        Technologies: string[];
        projectType: string[];
        categories: {
            $id: string;
            name: string;
        }[];
    }>;
    createProject(data: any): Promise<{
        $id: string;
        title: string;
        description: string;
        image: string;
        DemoLink: string;
        githubLink: string;
        Technologies: string[];
        projectType: string[];
        categories: {
            $id: string;
            name: string;
        }[];
    }>;
    updateProject(id: string, data: any): Promise<{
        $id: string;
        title: string;
        description: string;
        image: string;
        DemoLink: string;
        githubLink: string;
        Technologies: string[];
        projectType: string[];
        categories: {
            $id: string;
            name: string;
        }[];
    }>;
    deleteProject(id: string): Promise<boolean>;
    private mapProject;
    private mapCategory;
}
