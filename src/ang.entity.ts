// ang.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Ang {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
