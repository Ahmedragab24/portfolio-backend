"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificatesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const certificate_entity_1 = require("../../certificates/certificate.entity");
let CertificatesService = class CertificatesService {
    certRepository;
    constructor(certRepository) {
        this.certRepository = certRepository;
    }
    async findAll() {
        const list = await this.certRepository.find();
        return list.map(c => this.mapCertificate(c));
    }
    async findOne(id) {
        const cert = await this.certRepository.findOne({ where: { id } });
        if (!cert)
            throw new common_1.NotFoundException(`Certificate with ID ${id} not found`);
        return this.mapCertificate(cert);
    }
    async create(data) {
        const cert = this.certRepository.create(data);
        const saved = await this.certRepository.save(cert);
        return this.mapCertificate(saved);
    }
    async update(id, data) {
        const cert = await this.certRepository.findOne({ where: { id } });
        if (!cert)
            throw new common_1.NotFoundException(`Certificate with ID ${id} not found`);
        Object.assign(cert, data);
        const saved = await this.certRepository.save(cert);
        return this.mapCertificate(saved);
    }
    async delete(id) {
        const cert = await this.certRepository.findOne({ where: { id } });
        if (!cert)
            throw new common_1.NotFoundException(`Certificate with ID ${id} not found`);
        await this.certRepository.remove(cert);
        return true;
    }
    mapCertificate(cert) {
        return {
            $id: cert.id,
            $createdAt: cert.createdAt,
            $updatedAt: cert.updatedAt,
            name: cert.name,
            certificate: cert.certificate,
        };
    }
};
exports.CertificatesService = CertificatesService;
exports.CertificatesService = CertificatesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(certificate_entity_1.Certificate)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CertificatesService);
//# sourceMappingURL=certificates.service.js.map