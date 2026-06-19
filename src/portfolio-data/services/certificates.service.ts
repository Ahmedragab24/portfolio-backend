import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certificate } from '../../certificates/certificate.entity';

@Injectable()
export class CertificatesService {
  constructor(
    @InjectRepository(Certificate)
    private readonly certRepository: Repository<Certificate>,
  ) {}

  async findAll() {
    const list = await this.certRepository.find();
    return list.map(c => this.mapCertificate(c));
  }

  async findOne(id: string) {
    const cert = await this.certRepository.findOne({ where: { id } });
    if (!cert) throw new NotFoundException(`Certificate with ID ${id} not found`);
    return this.mapCertificate(cert);
  }

  async create(data: any) {
    const cert = this.certRepository.create(data as Partial<Certificate>);
    const saved = await this.certRepository.save(cert);
    return this.mapCertificate(saved);
  }

  async update(id: string, data: any) {
    const cert = await this.certRepository.findOne({ where: { id } });
    if (!cert) throw new NotFoundException(`Certificate with ID ${id} not found`);
    Object.assign(cert, data);
    const saved = await this.certRepository.save(cert);
    return this.mapCertificate(saved);
  }

  async delete(id: string) {
    const cert = await this.certRepository.findOne({ where: { id } });
    if (!cert) throw new NotFoundException(`Certificate with ID ${id} not found`);
    await this.certRepository.remove(cert);
    return true;
  }

  private mapCertificate(cert: Certificate) {
    return {
      $id: cert.id,
      $createdAt: cert.createdAt,
      $updatedAt: cert.updatedAt,
      name: cert.name,
      certificate: cert.certificate,
    };
  }
}
