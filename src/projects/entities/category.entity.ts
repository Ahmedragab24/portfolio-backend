import { Entity, PrimaryColumn, Column, ManyToMany, BeforeInsert } from 'typeorm';
import { Project } from './project.entity';
import { randomUUID } from 'crypto';

@Entity('categories')
export class Category {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Project, (project) => project.categories)
  projects: Project[];

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
