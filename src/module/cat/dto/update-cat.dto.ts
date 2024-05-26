import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { AnimalAge } from 'src/common/enum/animalAge.enum';
import { AnimalSize } from 'src/common/enum/animalSize.enum';
import { AnimalTemperament } from 'src/common/enum/animalTemperament.enum';
import { AnimalType } from 'src/common/enum/animalType.enum';

export class UpdateCatDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Whiskers',
    description: 'The name of the cat',
  })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Siamese',
    description: 'The breed of the cat',
  })
  breed?: string;

  @IsOptional()
  @IsEnum(AnimalType)
  @ApiPropertyOptional({ enum: AnimalType, example: AnimalType.CAT })
  animalType?: AnimalType;

  @IsOptional()
  @IsEnum(AnimalSize)
  @ApiPropertyOptional({ enum: AnimalSize, example: AnimalSize.SMALL })
  size?: AnimalSize;

  @IsOptional()
  @IsEnum(AnimalAge)
  @ApiPropertyOptional({ enum: AnimalAge, example: AnimalAge.ADULT })
  age?: AnimalAge;

  @IsOptional()
  @IsEnum(AnimalTemperament)
  @ApiPropertyOptional({
    enum: AnimalTemperament,
    example: AnimalTemperament.SHY,
  })
  temperament?: AnimalTemperament;
}
