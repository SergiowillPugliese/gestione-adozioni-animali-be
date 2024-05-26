import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Adopter } from '../adopter/entities/adopter.entity';

@Module({
  controllers: [CatController],
  providers: [CatService],
  imports: [TypeOrmModule.forFeature([Cat, Adopter])],
  exports: [TypeOrmModule],
})
export class CatModule {}
