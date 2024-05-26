import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dog } from './entities/dog.entity';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/common/dto/baseResponce.dto';

@ApiTags('dogs')
@Injectable()
export class DogService {
  constructor(
    @InjectRepository(Dog)
    private dogRepository: Repository<Dog>,
  ) {}

  @ApiOperation({ summary: 'Create a new dog' })
  @ApiResponse({ status: 201, description: 'Dog created successfully.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async create(createDogDto: CreateDogDto): Promise<BaseResponseDto<Dog>> {
    try {
      const dog = this.dogRepository.create(createDogDto);
      const data = await this.dogRepository.save(dog);
      const response: BaseResponseDto<Dog> = {
        success: true,
        message: 'Dog created successfully',
        data: data,
      };
      return response;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error creating dog: ' + error.message,
      );
    }
  }

  @ApiOperation({ summary: 'Get all dogs' })
  @ApiResponse({ status: 200, description: 'Dogs retrieved successfully.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async findAll(): Promise<BaseResponseDto<Dog[]>> {
    try {
      const data = await this.dogRepository.find({
        relations: ['adopter'],
      });
      const response: BaseResponseDto<Dog[]> = {
        success: true,
        message: 'Dogs retrieved successfully',
        data: data,
      };
      return response;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error retrieving dogs: ' + error.message,
      );
    }
  }

  @ApiOperation({ summary: 'Get a dog by ID' })
  @ApiResponse({ status: 200, description: 'Dog retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Dog not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async findOne(id: number): Promise<BaseResponseDto<Dog>> {
    try {
      const data = await this.dogRepository.findOne({
        where: { id },
        relations: ['adopter'],
      });
      if (!data) {
        throw new NotFoundException(`Dog with ID ${id} not found`);
      }
      const response: BaseResponseDto<Dog> = {
        success: true,
        message: `Dog with ID ${id} retrieved successfully`,
        data: data,
      };
      return response;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error retrieving dog: ' + error.message,
      );
    }
  }

  @ApiOperation({ summary: 'Update a dog by ID' })
  @ApiResponse({ status: 200, description: 'Dog updated successfully.' })
  @ApiResponse({ status: 404, description: 'Dog not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async update(
    id: number,
    updateDogDto: UpdateDogDto,
  ): Promise<BaseResponseDto<Dog>> {
    try {
      const existingDog = await this.dogRepository.findOneBy({ id });
      if (!existingDog) {
        throw new NotFoundException(`Dog with ID ${id} not found`);
      }
      const updatedDog = this.dogRepository.merge(existingDog, updateDogDto);
      const data = await this.dogRepository.save(updatedDog);
      const response: BaseResponseDto<Dog> = {
        success: true,
        message: `Dog with ID ${id} updated successfully`,
        data: data,
      };
      return response;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error updating dog: ' + error.message,
      );
    }
  }

  @ApiOperation({ summary: 'Delete a dog by ID' })
  @ApiResponse({ status: 200, description: 'Dog removed successfully.' })
  @ApiResponse({ status: 404, description: 'Dog not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async remove(id: number): Promise<BaseResponseDto<void>> {
    try {
      const result = await this.dogRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Dog with ID ${id} not found`);
      }
      const response: BaseResponseDto<void> = {
        success: true,
        message: `Dog with ID ${id} removed successfully`,
        data: null,
      };
      return response;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error removing dog: ' + error.message,
      );
    }
  }
}
