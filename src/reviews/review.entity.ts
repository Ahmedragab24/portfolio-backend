import { Entity, PrimaryColumn, Column, CreateDateColumn, BeforeInsert } from 'typeorm';
import { randomUUID } from 'crypto';

@Entity('reviews')
export class Review {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @Column('int')
  rating: number;

  @Column('text')
  review: string;

  @CreateDateColumn()
  createdAt: Date;

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
