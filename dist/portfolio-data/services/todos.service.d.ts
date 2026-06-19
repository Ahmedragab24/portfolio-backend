import { Repository } from 'typeorm';
import { Todo } from '../../todos/todo.entity';
export declare class TodosService {
    private readonly todoRepository;
    constructor(todoRepository: Repository<Todo>);
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
    create(data: any): Promise<{
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
    update(id: string, data: any): Promise<{
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
    delete(id: string): Promise<boolean>;
    private mapTodo;
}
