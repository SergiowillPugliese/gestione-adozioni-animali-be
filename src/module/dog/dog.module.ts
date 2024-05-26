import { Module } from '@nestjs/common';
import { DogService } from './dog.service';
import { DogController } from './dog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dog } from './entities/dog.entity';
import { Adopter } from '../adopter/entities/adopter.entity';

@Module({
  controllers: [DogController],
  providers: [DogService],
  imports: [TypeOrmModule.forFeature([Dog, Adopter])],
  exports: [TypeOrmModule],
})
export class DogModule {}
