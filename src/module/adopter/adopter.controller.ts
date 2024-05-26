import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { BaseResponseDto } from 'src/common/dto/baseResponce.dto';
import { AdopterService } from './adopter.service';
import { CreateAdopterDto } from './dto/create-adopter.dto';
import { UpdateAdopterDto } from './dto/update-adopter.dto';
import { Adopter } from './entities/adopter.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('adopter')
@Controller('adopter')
export class AdopterController {
  constructor(private readonly adopterService: AdopterService) {}

  @Post()
  async create(
    @Body() createAdopterDto: CreateAdopterDto,
  ): Promise<BaseResponseDto<Adopter>> {
    return await this.adopterService.create(createAdopterDto);
  }

  @Get()
  async findAll(): Promise<BaseResponseDto<Adopter[]>> {
    return await this.adopterService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BaseResponseDto<Adopter>> {
    return await this.adopterService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAdopterDto: UpdateAdopterDto,
  ): Promise<BaseResponseDto<Adopter>> {
    return await this.adopterService.update(+id, updateAdopterDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<BaseResponseDto<void>> {
    return await this.adopterService.remove(+id);
  }
}
