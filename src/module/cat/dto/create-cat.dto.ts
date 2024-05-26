import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AnimalAge } from 'src/common/enum/animalAge.enum';
import { AnimalSize } from 'src/common/enum/animalSize.enum';
import { AnimalTemperament } from 'src/common/enum/animalTemperament.enum';
import { AnimalType } from 'src/common/enum/animalType.enum';

export class CreateCatDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Whiskers',
    description: 'The name of the cat',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Siamese',
    description: 'The breed of the cat',
  })
  breed: string;

  @IsNotEmpty()
  @IsEnum(AnimalType)
  @ApiProperty({ enum: AnimalType, example: AnimalType.CAT })
  animalType: AnimalType;

  @IsNotEmpty()
  @IsEnum(AnimalSize)
  @ApiProperty({ enum: AnimalSize, example: AnimalSize.SMALL })
  size: AnimalSize;

  @IsNotEmpty()
  @IsEnum(AnimalAge)
  @ApiProperty({ enum: AnimalAge, example: AnimalAge.ADULT })
  age: AnimalAge;

  @IsNotEmpty()
  @IsEnum(AnimalTemperament)
  @ApiProperty({ enum: AnimalTemperament, example: AnimalTemperament.CALM })
  temperament: AnimalTemperament;
}
