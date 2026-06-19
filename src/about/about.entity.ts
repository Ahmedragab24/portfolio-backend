import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';
import { randomUUID } from 'crypto';

export interface SocialMediaItem {
  name: string;
  link: string;
  icon: string;
}

@Entity('about')
export class About {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  arabicName: string;

  @Column()
  position: string;

  @Column()
  arabicPosition: string;

  @Column('text')
  description: string;

  @Column('text')
  arabicDescription: string;

  @Column()
  CV: string;

  @Column()
  email: string;

  @Column('jsonb', { default: [] })
  socialMedia: SocialMediaItem[];

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
