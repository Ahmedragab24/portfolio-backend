import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable, BeforeInsert } from 'typeorm';
import { Category } from './category.entity';
import { randomUUID } from 'crypto';

@Entity('projects')
export class Project {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  image: string;

  @Column({ nullable: true })
  DemoLink: string;

  @Column({ nullable: true })
  githubLink: string;

  @ManyToMany(() => Category, (category) => category.projects, { onDelete: 'CASCADE' })
  @JoinTable({
    name: 'project_categories',
    joinColumn: { name: 'project_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' }
  })
  categories: Category[];

  @Column('simple-array', { nullable: true })
  Technologies: string[];

  @Column('simple-array', { nullable: true })
  projectType: string[];

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
