import { ProjectsService } from './projects.service';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    findAll(): Promise<{
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
    findOne(id: string): Promise<{
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
    create(body: any): Promise<{
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
    update(id: string, body: any): Promise<{
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
    remove(id: string): Promise<boolean>;
}
