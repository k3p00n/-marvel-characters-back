import { IsBoolean, IsNumber, IsString, IsUUID } from 'class-validator';

export class CharacterCreateDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsBoolean()
  isActiveInFilms: boolean;

  @IsUUID()
  genderId: string;
}
