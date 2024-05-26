import { IsString, IsInt, IsBoolean } from 'class-validator';

export class CreateAnimalDto {
  @IsString()
  img: string;

  @IsString()
  name: string;

  @IsString()
  species: string;

  @IsInt()
  age: number;

  @IsString()
  description: string;

  @IsBoolean()
  adopted: boolean;
}
