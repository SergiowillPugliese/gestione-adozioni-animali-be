// src/animals/entities/animal.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  img: string;

  @Column()
  name: string;

  @Column()
  species: string;

  @Column()
  age: number;

  @Column()
  description: string;

  @Column()
  adopted: boolean;
}
