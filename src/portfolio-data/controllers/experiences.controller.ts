import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ExperiencesService } from '../services/experiences.service';
import { AuthGuard } from '../../auth/auth.guard';

@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Get()
  async findAll() {
    return this.experiencesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.experiencesService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() body: any) {
    return this.experiencesService.create(body);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.experiencesService.update(id, body);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.experiencesService.delete(id);
  }
}
