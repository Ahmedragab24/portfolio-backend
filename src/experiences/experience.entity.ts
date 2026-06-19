import { Entity, PrimaryColumn, Column, CreateDateColumn, BeforeInsert } from 'typeorm';
import { randomUUID } from 'crypto';

@Entity('experiences')
export class Experience {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  arabicTitle: string;

  @Column('text')
  description: string;

  @Column('text')
  arabicDescription: string;

  @Column({ nullable: true })
  link: string;

  @Column({ nullable: true })
  titleLink: string;

  @Column({ nullable: true })
  arabicTitleLink: string;

  @Column('float')
  motion: number;

  @Column('float')
  duration: number;

  @CreateDateColumn()
  createdAt: Date;

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
