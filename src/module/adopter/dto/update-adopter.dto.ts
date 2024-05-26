import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateAdopterDto } from './create-adopter.dto';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PetPreferenceDto } from 'src/common/dto/pet-preference.dto';
import { AnimalAge } from 'src/common/enum/animalAge.enum';
import { AnimalSize } from 'src/common/enum/animalSize.enum';
import { AnimalTemperament } from 'src/common/enum/animalTemperament.enum';
import { AnimalType } from 'src/common/enum/animalType.enum';

export class UpdateAdopterDto extends PartialType(CreateAdopterDto) {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'The name of the adopter',
  })
  name?: string;

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({
    example: 'john.doe@example.com',
    description: 'The email of the adopter',
  })
  email?: string;

  @IsOptional()
  @IsPhoneNumber(null)
  @ApiPropertyOptional({
    example: '1234567890',
    description: 'The phone number of the adopter',
  })
  phone?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PetPreferenceDto)
  @ApiPropertyOptional({
    example: [
      {
        animalType: AnimalType.DOG || AnimalType.CAT,
        size: AnimalSize.SMALL || AnimalSize.MEDIUM || AnimalSize.LARGE,
        age: AnimalAge.PUPPY || AnimalAge.ADULT || AnimalAge.SENIOR,
        temperament:
          AnimalTemperament.CALM ||
          AnimalTemperament.SHY ||
          AnimalTemperament.ENERGETIC,
      },
    ],
    description: 'The types of pets the adopter is interested in adopting',
    type: [PetPreferenceDto],
  })
  petPreferences?: PetPreferenceDto[];

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Appartamento in condominio senza giardino',
    description: 'The type of housing the adopter lives in',
  })
  housingType?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'I have a big backyard for the pets to play in',
    description: 'A note from the adopter',
  })
  note?: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    example: false,
    description: 'Indicates whether the adopter is approved or not',
  })
  isApproved?: boolean;

  @IsOptional()
  @IsArray()
  @ApiPropertyOptional({
    example: [1, 2, 3],
    description: 'List of dog IDs adopted by the adopter',
  })
  dogs?: number[];

  @IsOptional()
  @IsArray()
  @ApiPropertyOptional({
    example: [4, 5, 6],
    description: 'List of cat IDs adopted by the adopter',
  })
  cats?: number[];
}
