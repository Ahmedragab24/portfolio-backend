import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from './user.entity';
export declare class AuthService implements OnModuleInit {
    private userRepository;
    private jwtService;
    private configService;
    constructor(userRepository: Repository<User>, jwtService: JwtService, configService: ConfigService);
    onModuleInit(): Promise<void>;
    seedAdminUser(): Promise<void>;
    login(email: string, password: string): Promise<{
        jwt: string;
        user: {
            $id: string;
            email: string;
            name: string;
        };
    }>;
    validateUserById(id: string): Promise<User | null>;
    updateUser(id: string, email?: string, password?: string, name?: string): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
