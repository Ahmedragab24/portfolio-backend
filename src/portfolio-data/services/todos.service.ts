import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../../todos/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async findAll() {
    const list = await this.todoRepository.find();
    return list.map(t => this.mapTodo(t));
  }

  async findOne(id: string) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) throw new NotFoundException(`Todo with ID ${id} not found`);
    return this.mapTodo(todo);
  }

  async create(data: any) {
    const todo = this.todoRepository.create(data as Partial<Todo>);
    const saved = await this.todoRepository.save(todo);
    return this.mapTodo(saved);
  }

  async update(id: string, data: any) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) throw new NotFoundException(`Todo with ID ${id} not found`);
    Object.assign(todo, data);
    const saved = await this.todoRepository.save(todo);
    return this.mapTodo(saved);
  }

  async delete(id: string) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) throw new NotFoundException(`Todo with ID ${id} not found`);
    await this.todoRepository.remove(todo);
    return true;
  }

  private mapTodo(todo: Todo) {
    return {
      $id: todo.id,
      $createdAt: todo.createdAt,
      $updatedAt: todo.updatedAt,
      Title: todo.Title,
      Description: todo.Description,
      completed: todo.completed,
      Date: todo.Date,
      Priority: todo.Priority,
      Category: todo.Category,
    };
  }
}
