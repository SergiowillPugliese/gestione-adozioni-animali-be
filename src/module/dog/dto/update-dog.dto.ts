import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { AnimalAge } from 'src/common/enum/animalAge.enum';
import { AnimalSize } from 'src/common/enum/animalSize.enum';
import { AnimalTemperament } from 'src/common/enum/animalTemperament.enum';
import { AnimalType } from 'src/common/enum/animalType.enum';

export class UpdateDogDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Fido',
    description: 'The name of the dog',
  })
  name?: string;

  @IsOptional()
  @IsEnum(AnimalType)
  @ApiPropertyOptional({ enum: AnimalType, example: AnimalType.DOG })
  animalType?: AnimalType;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Labrador',
    description: 'The breed of the dog',
  })
  breed?: string;

  @IsOptional()
  @IsEnum(AnimalSize)
  @ApiPropertyOptional({ enum: AnimalSize, example: AnimalSize.MEDIUM })
  size?: AnimalSize;

  @IsOptional()
  @IsEnum(AnimalAge)
  @ApiPropertyOptional({ enum: AnimalAge, example: AnimalAge.ADULT })
  age?: AnimalAge;

  @IsOptional()
  @IsEnum(AnimalTemperament)
  @ApiPropertyOptional({
    enum: AnimalTemperament,
    example: AnimalTemperament.CALM,
  })
  temperament?: AnimalTemperament;
}
