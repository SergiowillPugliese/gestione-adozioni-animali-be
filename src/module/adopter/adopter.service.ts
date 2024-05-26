import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { Adopter } from './entities/adopter.entity';
import { CreateAdopterDto } from './dto/create-adopter.dto';
import { BaseResponseDto } from 'src/common/dto/baseResponce.dto';
import { UpdateAdopterDto } from './dto/update-adopter.dto';
import { Dog } from 'src/module/dog/entities/dog.entity';
import { Cat } from 'src/module/cat/entities/cat.entity';

@Injectable()
export class AdopterService {
  constructor(
    @InjectRepository(Adopter)
    private adopterRepository: Repository<Adopter>,
    @InjectRepository(Dog)
    private dogRepository: Repository<Dog>,
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
  ) {}

  async create(
    createAdopterDto: CreateAdopterDto,
  ): Promise<BaseResponseDto<Adopter>> {
    try {
      const adopter = this.adopterRepository.create(
        createAdopterDto as DeepPartial<Adopter>,
      );

      if (
        !createAdopterDto.isApproved &&
        (createAdopterDto.dogs || createAdopterDto.cats)
      ) {
        throw new InternalServerErrorException(
          "Il candidato non è idoneo all'adozione",
        );
      }

      if (createAdopterDto.dogs) {
        const dogs = await this.dogRepository.findByIds(createAdopterDto.dogs);
        adopter.dogs = Promise.resolve(dogs);
      }

      if (createAdopterDto.cats) {
        const cats = await this.catRepository.findByIds(createAdopterDto.cats);
        adopter.cats = Promise.resolve(cats);
      }

      const data = await this.adopterRepository.save(adopter);
      const response: BaseResponseDto<Adopter> = {
        success: true,
        message: 'Adopter created successfully',
        data: data,
      };
      return response;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error creating adopter: ' + error.message,
      );
    }
  }

  async findAll(): Promise<BaseResponseDto<Adopter[]>> {
    try {
      const data = await this.adopterRepository.find({
        relations: ['dogs', 'cats'],
      });
      const response: BaseResponseDto<Adopter[]> = {
        success: true,
        message: 'Adopters retrieved successfully',
        data: data,
      };
      return response;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error retrieving adopters: ' + error.message,
      );
    }
  }

  async findOne(id: number): Promise<BaseResponseDto<Adopter>> {
    try {
      const data = await this.adopterRepository.findOne({
        where: { id },
        relations: ['dogs', 'cats'],
      });
      if (!data) {
        throw new NotFoundException(`Adopter with ID ${id} not found`);
      }
      const response: BaseResponseDto<Adopter> = {
        success: true,
        message: `Adopter with ID ${id} retrieved successfully`,
        data: data,
      };
      return response;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error retrieving adopter: ' + error.message,
      );
    }
  }

  async update(
    id: number,
    updateAdopterDto: UpdateAdopterDto,
  ): Promise<BaseResponseDto<Adopter>> {
    try {
      const existingAdopter = await this.adopterRepository.findOne({
        where: { id },
        relations: ['dogs', 'cats'],
      });
      if (!existingAdopter) {
        throw new NotFoundException(`Adopter with ID ${id} not found`);
      }

      if (
        !updateAdopterDto.isApproved &&
        (updateAdopterDto.dogs || updateAdopterDto.cats)
      ) {
        throw new InternalServerErrorException(
          "Il candidato non è idoneo all'adozione",
        );
      }

      const updatedAdopter = this.adopterRepository.merge(
        existingAdopter,
        updateAdopterDto as DeepPartial<Adopter>,
      );

      if (updateAdopterDto.dogs) {
        const dogs = await this.dogRepository.findByIds(updateAdopterDto.dogs);
        updatedAdopter.dogs = Promise.resolve(dogs);
      }

      if (updateAdopterDto.cats) {
        const cats = await this.catRepository.findByIds(updateAdopterDto.cats);
        updatedAdopter.cats = Promise.resolve(cats);
      }

      const data = await this.adopterRepository.save(updatedAdopter);
      const response: BaseResponseDto<Adopter> = {
        success: true,
        message: `Adopter with ID ${id} updated successfully`,
        data: data,
      };
      return response;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error updating adopter: ' + error.message,
      );
    }
  }

  async remove(id: number): Promise<BaseResponseDto<void>> {
    try {
      const adopter = await this.adopterRepository.findOne({
        where: { id },
        relations: ['dogs', 'cats'],
      });
      if (!adopter) {
        throw new NotFoundException(`Adopter with ID ${id} not found`);
      }

      if (adopter.dogs) {
        for (const dog of await adopter.dogs) {
          dog.adopter = null;
          await this.dogRepository.save(dog);
        }
      }

      if (adopter.cats) {
        for (const cat of await adopter.cats) {
          cat.adopter = null;
          await this.catRepository.save(cat);
        }
      }

      await this.adopterRepository.delete(id);
      const response: BaseResponseDto<void> = {
        success: true,
        message: `Adopter with ID ${id} removed successfully`,
        data: null,
      };
      return response;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error removing adopter: ' + error.message,
      );
    }
  }
}
