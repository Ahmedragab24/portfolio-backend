import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: any): Promise<{
        jwt: string;
        user: {
            $id: string;
            email: string;
            name: string;
        };
    }>;
    getProfile(req: any): Promise<{
        $id: string;
        email: string;
        name: string;
    } | null>;
    updateProfile(req: any, body: any): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    adminUpdateUser(req: any, body: any, id: string): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    logout(): Promise<{
        success: boolean;
    }>;
}
