import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  ValidateNested,
  IsArray,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PetPreferenceDto } from 'src/common/dto/pet-preference.dto';
import { BaseEntityCreateOrEditDto } from 'src/common/dto/baseEntityCreateOrEdit.dto';
import { AnimalAge } from 'src/common/enum/animalAge.enum';
import { AnimalSize } from 'src/common/enum/animalSize.enum';
import { AnimalTemperament } from 'src/common/enum/animalTemperament.enum';
import { AnimalType } from 'src/common/enum/animalType.enum';

export class CreateAdopterDto extends BaseEntityCreateOrEditDto {
  @IsString()
  @ApiProperty({ example: 'John Doe', description: 'The name of the adopter' })
  name: string;

  @IsEmail()
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the adopter',
  })
  email: string;

  @IsPhoneNumber(null)
  @ApiProperty({
    example: '+393348578966',
    description: 'The phone number of the adopter',
  })
  phone: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PetPreferenceDto)
  @ApiProperty({
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
  petPreferences: PetPreferenceDto[];

  @IsString()
  @ApiProperty({
    example: 'Appartamento in condominio senza giardino',
    description: 'The type of housing the adopter lives in',
  })
  housingType: string;

  @IsString()
  @ApiPropertyOptional({
    example: 'I have a big backyard for the pets to play in',
    description: 'A note from the adopter',
  })
  note?: string;

  @IsBoolean()
  @ApiProperty({
    example: false,
    description: 'Indicates whether the adopter is approved or not',
  })
  isApproved: boolean;

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
