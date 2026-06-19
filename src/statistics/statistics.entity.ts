import { Entity, PrimaryColumn, Column, CreateDateColumn, BeforeInsert } from 'typeorm';
import { randomUUID } from 'crypto';

@Entity('statistics')
export class Statistics {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  arTitle: string;

  @Column('int')
  number: number;

  @CreateDateColumn()
  createdAt: Date;

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
