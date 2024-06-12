import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('emblems')
export class Emblems {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Identificador único do emblema' })
  id: number;

  @Column({ length: 255, unique: true })
  @ApiProperty({ example: 'cda', description: 'Slug único do emblema' })
  slug: string;

  @Column({ length: 255 })
  @ApiProperty({ example: 'Nome do Emblema', description: 'Nome do emblema' })
  name: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    example: 'http://example.com/image.png',
    description: 'URL da imagem do emblema',
    nullable: true,
  })
  image: string;
}
