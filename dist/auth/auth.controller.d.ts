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
    logout(): Promise<{
        success: boolean;
    }>;
}
