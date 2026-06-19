import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async findAll() {
    return this.projectsService.findAllCategories();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.projectsService.findCategoryById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() body: any) {
    return this.projectsService.createCategory(body.name);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.projectsService.updateCategory(id, body.name);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.projectsService.deleteCategory(id);
  }
}
