import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('emblems')
export class Emblems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true })
  slug: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  image: string;
}
