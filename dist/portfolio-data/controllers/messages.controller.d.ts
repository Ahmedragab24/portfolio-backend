import { MessagesService } from '../services/messages.service';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    findAll(): Promise<{
        $id: string;
        $createdAt: Date;
        name: string;
        email: string;
        message: string;
        PhoneNumber: string;
    }[]>;
    findOne(id: string): Promise<{
        $id: string;
        $createdAt: Date;
        name: string;
        email: string;
        message: string;
        PhoneNumber: string;
    }>;
    create(body: any): Promise<{
        $id: string;
        $createdAt: Date;
        name: string;
        email: string;
        message: string;
        PhoneNumber: string;
    }>;
    remove(id: string): Promise<boolean>;
}
