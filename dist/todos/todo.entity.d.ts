export type Priority = 'Low' | 'Medium' | 'High';
export type TodoCategory = 'Worship' | 'Personality' | 'Programming' | 'Work' | 'Health' | 'Other';
export declare class Todo {
    id: string;
    Title: string;
    Description: string;
    completed: boolean;
    Date: Date;
    Priority: Priority;
    Category: TodoCategory;
    createdAt: Date;
    updatedAt: Date;
    generateId(): void;
}
