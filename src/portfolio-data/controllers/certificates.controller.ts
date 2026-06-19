import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CertificatesService } from '../services/certificates.service';
import { AuthGuard } from '../../auth/auth.guard';

@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certService: CertificatesService) {}

  @Get()
  async findAll() {
    return this.certService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.certService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() body: any) {
    return this.certService.create(body);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.certService.update(id, body);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.certService.delete(id);
  }
}
