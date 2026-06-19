import { TodosService } from '../services/todos.service';
export declare class TodosController {
    private readonly todosService;
    constructor(todosService: TodosService);
    findAll(): Promise<{
        $id: string;
        $createdAt: Date;
        $updatedAt: Date;
        Title: string;
        Description: string;
        completed: boolean;
        Date: Date;
        Priority: import("../../todos/todo.entity").Priority;
        Category: import("../../todos/todo.entity").TodoCategory;
    }[]>;
    findOne(id: string): Promise<{
        $id: string;
        $createdAt: Date;
        $updatedAt: Date;
        Title: string;
        Description: string;
        completed: boolean;
        Date: Date;
        Priority: import("../../todos/todo.entity").Priority;
        Category: import("../../todos/todo.entity").TodoCategory;
    }>;
    create(body: any): Promise<{
        $id: string;
        $createdAt: Date;
        $updatedAt: Date;
        Title: string;
        Description: string;
        completed: boolean;
        Date: Date;
        Priority: import("../../todos/todo.entity").Priority;
        Category: import("../../todos/todo.entity").TodoCategory;
    }>;
    update(id: string, body: any): Promise<{
        $id: string;
        $createdAt: Date;
        $updatedAt: Date;
        Title: string;
        Description: string;
        completed: boolean;
        Date: Date;
        Priority: import("../../todos/todo.entity").Priority;
        Category: import("../../todos/todo.entity").TodoCategory;
    }>;
    remove(id: string): Promise<boolean>;
}
