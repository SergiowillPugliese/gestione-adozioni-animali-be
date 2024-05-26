import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './entities/cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/common/dto/baseResponce.dto';

@ApiTags('cats')
@Injectable()
export class CatService {
  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
  ) {}

  @ApiOperation({ summary: 'Create a new cat' })
  @ApiResponse({ status: 201, description: 'Cat created successfully.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async create(createCatDto: CreateCatDto): Promise<BaseResponseDto<Cat>> {
    try {
      const cat = this.catRepository.create(createCatDto);
      const data = await this.catRepository.save(cat);
      const response: BaseResponseDto<Cat> = {
        success: true,
        message: 'Cat created successfully',
        data: data,
      };
      return response;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error creating cat: ' + error.message,
      );
    }
  }

  @ApiOperation({ summary: 'Get all cats' })
  @ApiResponse({ status: 200, description: 'Cats retrieved successfully.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async findAll(): Promise<BaseResponseDto<Cat[]>> {
    try {
      const data = await this.catRepository.find({
        relations: ['adopter'],
      });
      const response: BaseResponseDto<Cat[]> = {
        success: true,
        message: 'Cats retrieved successfully',
        data: data,
      };
      return response;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error retrieving cats: ' + error.message,
      );
    }
  }

  @ApiOperation({ summary: 'Get a cat by ID' })
  @ApiResponse({ status: 200, description: 'Cat retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Cat not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async findOne(id: number): Promise<BaseResponseDto<Cat>> {
    try {
      const data = await this.catRepository.findOne({
        where: { id },
        relations: ['adopter'],
      });
      if (!data) {
        throw new NotFoundException(`Cat with ID ${id} not found`);
      }
      const response: BaseResponseDto<Cat> = {
        success: true,
        message: `Cat with ID ${id} retrieved successfully`,
        data: data,
      };
      return response;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error retrieving cat: ' + error.message,
      );
    }
  }

  @ApiOperation({ summary: 'Update a cat by ID' })
  @ApiResponse({ status: 200, description: 'Cat updated successfully.' })
  @ApiResponse({ status: 404, description: 'Cat not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async update(
    id: number,
    updateCatDto: UpdateCatDto,
  ): Promise<BaseResponseDto<Cat>> {
    try {
      const existingCat = await this.catRepository.findOneBy({ id });
      if (!existingCat) {
        throw new NotFoundException(`Cat with ID ${id} not found`);
      }
      const updatedCat = this.catRepository.merge(existingCat, updateCatDto);
      const data = await this.catRepository.save(updatedCat);
      const response: BaseResponseDto<Cat> = {
        success: true,
        message: `Cat with ID ${id} updated successfully`,
        data: data,
      };
      return response;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error updating cat: ' + error.message,
      );
    }
  }

  @ApiOperation({ summary: 'Delete a cat by ID' })
  @ApiResponse({ status: 200, description: 'Cat removed successfully.' })
  @ApiResponse({ status: 404, description: 'Cat not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async remove(id: number): Promise<BaseResponseDto<void>> {
    try {
      const result = await this.catRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Cat with ID ${id} not found`);
      }
      const response: BaseResponseDto<void> = {
        success: true,
        message: `Cat with ID ${id} removed successfully`,
        data: null,
      };
      return response;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error removing cat: ' + error.message,
      );
    }
  }
}
