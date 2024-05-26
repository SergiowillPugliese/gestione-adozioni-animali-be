import { Entity, ManyToOne } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Adopter } from 'src/module/adopter/entities/adopter.entity';
import { Animal } from 'src/common/entities/animal.entity';

@Entity()
export class Dog extends Animal {
  @ManyToOne(() => Adopter, (adopter) => adopter.dogs, {
    nullable: true,
    lazy: true,
  })
  @ApiPropertyOptional({ description: 'The adopter of the dog' })
  adopter?: Promise<Adopter>;
}
