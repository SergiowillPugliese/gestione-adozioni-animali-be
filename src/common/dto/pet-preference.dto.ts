import { IsEnum } from 'class-validator';
import { AnimalType } from '../enum/animalType.enum';
import { AnimalAge } from '../enum/animalAge.enum';
import { AnimalSize } from '../enum/animalSize.enum';
import { AnimalTemperament } from '../enum/animalTemperament.enum';

export class PetPreferenceDto {
  @IsEnum(AnimalType)
  animalType: AnimalType;

  @IsEnum(AnimalSize)
  size: AnimalSize;

  @IsEnum(AnimalAge)
  age: AnimalAge;

  @IsEnum(AnimalTemperament)
  temperament: AnimalTemperament;
}
