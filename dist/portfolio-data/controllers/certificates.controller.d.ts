import { CertificatesService } from '../services/certificates.service';
export declare class CertificatesController {
    private readonly certService;
    constructor(certService: CertificatesService);
    findAll(): Promise<{
        $id: string;
        $createdAt: Date;
        $updatedAt: Date;
        name: string;
        certificate: string;
    }[]>;
    findOne(id: string): Promise<{
        $id: string;
        $createdAt: Date;
        $updatedAt: Date;
        name: string;
        certificate: string;
    }>;
    create(body: any): Promise<{
        $id: string;
        $createdAt: Date;
        $updatedAt: Date;
        name: string;
        certificate: string;
    }>;
    update(id: string, body: any): Promise<{
        $id: string;
        $createdAt: Date;
        $updatedAt: Date;
        name: string;
        certificate: string;
    }>;
    remove(id: string): Promise<boolean>;
}
