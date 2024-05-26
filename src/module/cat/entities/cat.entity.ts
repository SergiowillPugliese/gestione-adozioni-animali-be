import { Entity, ManyToOne } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Adopter } from 'src/module/adopter/entities/adopter.entity';
import { Animal } from 'src/common/entities/animal.entity';

@Entity()
export class Cat extends Animal {
  @ManyToOne(() => Adopter, (adopter) => adopter.cats, {
    nullable: true,
    lazy: true,
  })
  @ApiPropertyOptional({ description: 'The adopter of the cat' })
  adopter?: Promise<Adopter>;
}
