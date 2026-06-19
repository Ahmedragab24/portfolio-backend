import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';
import { randomUUID } from 'crypto';

export type Priority = 'Low' | 'Medium' | 'High';
export type TodoCategory = 'Worship' | 'Personality' | 'Programming' | 'Work' | 'Health' | 'Other';

@Entity('todos')
export class Todo {
  @PrimaryColumn()
  id: string;

  @Column()
  Title: string;

  @Column('text')
  Description: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ type: 'timestamp' })
  Date: Date;

  @Column({ type: 'varchar' })
  Priority: Priority;

  @Column({ type: 'varchar' })
  Category: TodoCategory;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
