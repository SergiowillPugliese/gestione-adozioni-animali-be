import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  TableInheritance,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AnimalAge } from '../enum/animalAge.enum';
import { AnimalSize } from '../enum/animalSize.enum';
import { AnimalTemperament } from '../enum/animalTemperament.enum';
import { AnimalType } from '../enum/animalType.enum';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Animal {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the animal',
  })
  id: number;

  @Column()
  @ApiProperty({
    example: 'Some Animal',
    description: 'The name of the animal',
  })
  name: string;

  @Column({
    type: 'enum',
    enum: AnimalType,
  })
  @ApiProperty({ enum: AnimalType, example: AnimalType.DOG })
  animalType: AnimalType;

  @Column()
  @ApiProperty({ example: 'Unknown', description: 'The breed of the animal' })
  breed: string;

  @Column({
    type: 'enum',
    enum: AnimalSize,
  })
  @ApiProperty({ enum: AnimalSize, example: AnimalSize.MEDIUM })
  size: AnimalSize;

  @Column({
    type: 'enum',
    enum: AnimalAge,
  })
  @ApiProperty({ enum: AnimalAge, example: AnimalAge.ADULT })
  age: AnimalAge;

  @Column({
    type: 'enum',
    enum: AnimalTemperament,
  })
  @ApiProperty({ enum: AnimalTemperament, example: AnimalTemperament.CALM })
  temperament: AnimalTemperament;

  @CreateDateColumn()
  @ApiProperty({
    example: '2023-05-24T14:15:22Z',
    description: 'The date when the animal was created',
  })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    example: '2023-05-24T14:15:22Z',
    description: 'The date when the animal was last updated',
  })
  updatedAt: Date;
}
