import { ProjectsService } from './projects.service';
export declare class CategoriesController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    findAll(): Promise<{
        $id: string;
        name: string;
    }[]>;
    findOne(id: string): Promise<{
        $id: string;
        name: string;
    }>;
    create(body: any): Promise<{
        $id: string;
        name: string;
    }>;
    update(id: string, body: any): Promise<{
        $id: string;
        name: string;
    }>;
    remove(id: string): Promise<boolean>;
}
