import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { TodosService } from '../services/todos.service';
import { AuthGuard } from '../../auth/auth.guard';

@UseGuards(AuthGuard) // Protect all todo endpoints
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.todosService.findOne(id);
  }

  @Post()
  async create(@Body() body: any) {
    return this.todosService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.todosService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.todosService.delete(id);
  }
}
