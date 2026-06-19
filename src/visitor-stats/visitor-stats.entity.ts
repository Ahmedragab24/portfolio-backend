import { Entity, PrimaryColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity('visitor_stats')
export class VisitorStats {
  @PrimaryColumn()
  id: string; // "total_visits"

  @Column({ default: 0 })
  total_visits: number;

  @UpdateDateColumn()
  last_updated: Date;
}
