// src/animals/animals.service.ts
import { Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private animalsRepository: Repository<Animal>,
  ) {}

  findAll(): Promise<Animal[]> {
    return this.animalsRepository.find();
  }

  findOne(id: number): Promise<Animal> {
    return this.animalsRepository.findOne({ where: { id } });
  }

  async create(createAnimalDto: CreateAnimalDto): Promise<Animal> {
    const animal = this.animalsRepository.create(createAnimalDto);
    return this.animalsRepository.save(animal);
  }

  async update(id: number, updateAnimalDto: UpdateAnimalDto): Promise<Animal> {
    await this.animalsRepository.update(id, updateAnimalDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.animalsRepository.delete(id);
  }
}
