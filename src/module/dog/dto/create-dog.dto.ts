import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AnimalAge } from 'src/common/enum/animalAge.enum';
import { AnimalSize } from 'src/common/enum/animalSize.enum';
import { AnimalTemperament } from 'src/common/enum/animalTemperament.enum';
import { AnimalType } from 'src/common/enum/animalType.enum';

export class CreateDogDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Fido',
    description: 'The name of the dog',
  })
  name: string;

  @IsNotEmpty()
  @IsEnum(AnimalType)
  @ApiProperty({ enum: AnimalType, example: AnimalType.DOG })
  animalType: AnimalType;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Labrador',
    description: 'The breed of the dog',
  })
  breed: string;

  @IsNotEmpty()
  @IsEnum(AnimalSize)
  @ApiProperty({ enum: AnimalSize, example: AnimalSize.MEDIUM })
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
