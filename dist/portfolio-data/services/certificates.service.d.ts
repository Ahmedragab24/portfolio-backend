import { Repository } from 'typeorm';
import { Certificate } from '../../certificates/certificate.entity';
export declare class CertificatesService {
    private readonly certRepository;
    constructor(certRepository: Repository<Certificate>);
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
    create(data: any): Promise<{
        $id: string;
        $createdAt: Date;
        $updatedAt: Date;
        name: string;
        certificate: string;
    }>;
    update(id: string, data: any): Promise<{
        $id: string;
        $createdAt: Date;
        $updatedAt: Date;
        name: string;
        certificate: string;
    }>;
    delete(id: string): Promise<boolean>;
    private mapCertificate;
}
