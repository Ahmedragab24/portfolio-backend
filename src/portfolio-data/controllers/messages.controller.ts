import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { MessagesService } from '../services/messages.service';
import { AuthGuard } from '../../auth/auth.guard';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return this.messagesService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }

  // Public endpoint so visitors can send messages
  @Post()
  async create(@Body() body: any) {
    return this.messagesService.create(body);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.messagesService.delete(id);
  }
}
