import { Repository } from 'typeorm';
import { Message } from '../../messages/message.entity';
export declare class MessagesService {
    private readonly messageRepository;
    constructor(messageRepository: Repository<Message>);
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
    create(data: any): Promise<{
        $id: string;
        $createdAt: Date;
        name: string;
        email: string;
        message: string;
        PhoneNumber: string;
    }>;
    delete(id: string): Promise<boolean>;
    private mapMessage;
}
