import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PetPreferenceDto } from 'src/common/dto/pet-preference.dto';
import { Dog } from 'src/module/dog/entities/dog.entity';
import { Cat } from 'src/module/cat/entities/cat.entity';

@Entity()
export class Adopter {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the adopter',
  })
  id: number;

  @Column()
  @ApiProperty({ example: 'John Doe', description: 'The name of the adopter' })
  name: string;

  @Column()
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the adopter',
  })
  email: string;

  @Column()
  @ApiProperty({
    example: '1234567890',
    description: 'The phone number of the adopter',
  })
  phone: string;

  @Column({ type: 'json' })
  @ApiProperty({
    example: [
      { animalType: 'DOG', size: 'MEDIUM', age: 'ADULT', temperament: 'CALM' },
      { animalType: 'CAT', size: 'SMALL', age: 'SENIOR', temperament: 'SHY' },
    ],
    description: 'The types of pets the adopter is interested in adopting',
    type: [PetPreferenceDto],
  })
  petPreferences: PetPreferenceDto[];

  @Column()
  @ApiProperty({
    example: 'Apartment',
    description: 'The type of housing the adopter lives in',
  })
  housingType: string;

  @Column()
  @ApiPropertyOptional({
    example: 'I have a big backyard for the pets to play in',
    description: 'A note from the adopter',
  })
  note?: string;

  @Column({ default: false })
  @ApiProperty({
    example: false,
    description: 'Indicates whether the adopter is approved or not',
  })
  isApproved: boolean;

  @CreateDateColumn()
  @ApiProperty({
    example: '2023-05-24T14:15:22Z',
    description: 'The date when the adopter was created',
  })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    example: '2023-05-24T14:15:22Z',
    description: 'The date when the adopter was last updated',
  })
  updatedAt: Date;

  @OneToMany(() => Dog, (dog) => dog.adopter, { nullable: true, lazy: true })
  @ApiPropertyOptional({
    type: () => [Dog],
    description: 'List of dogs adopted by the adopter',
  })
  dogs?: Promise<Dog[]>;

  @OneToMany(() => Cat, (cat) => cat.adopter, { nullable: true, lazy: true })
  @ApiPropertyOptional({
    type: () => [Cat],
    description: 'List of cats adopted by the adopter',
  })
  cats?: Promise<Cat[]>;
}
