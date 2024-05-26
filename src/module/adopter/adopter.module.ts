import { Module } from '@nestjs/common';
import { AdopterService } from './adopter.service';
import { AdopterController } from './adopter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adopter } from './entities/adopter.entity';
import { DogModule } from '../dog/dog.module';
import { CatModule } from '../cat/cat.module';
import { Dog } from '../dog/entities/dog.entity';
import { Cat } from '../cat/entities/cat.entity';

@Module({
  controllers: [AdopterController],
  providers: [AdopterService],
  imports: [
    TypeOrmModule.forFeature([Adopter, Dog, Cat]),
    DogModule,
    CatModule,
  ],
})
export class AdopterModule {}
