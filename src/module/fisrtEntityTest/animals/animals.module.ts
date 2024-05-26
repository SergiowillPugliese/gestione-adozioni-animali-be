import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity';

@Module({
  controllers: [AnimalsController],
  providers: [AnimalsService],
  imports: [TypeOrmModule.forFeature([Animal])],
})
export class AnimalsModule {}
