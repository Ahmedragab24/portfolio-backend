import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../../messages/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async findAll() {
    const list = await this.messageRepository.find();
    return list.map(m => this.mapMessage(m));
  }

  async findOne(id: string) {
    const message = await this.messageRepository.findOne({ where: { id } });
    if (!message) throw new NotFoundException(`Message with ID ${id} not found`);
    return this.mapMessage(message);
  }

  async create(data: any) {
    const message = this.messageRepository.create(data as Partial<Message>);
    const saved = await this.messageRepository.save(message);
    return this.mapMessage(saved);
  }

  async delete(id: string) {
    const message = await this.messageRepository.findOne({ where: { id } });
    if (!message) throw new NotFoundException(`Message with ID ${id} not found`);
    await this.messageRepository.remove(message);
    return true;
  }

  private mapMessage(message: Message) {
    return {
      $id: message.id,
      $createdAt: message.createdAt,
      name: message.name,
      email: message.email,
      message: message.message,
      PhoneNumber: message.PhoneNumber,
    };
  }
}
