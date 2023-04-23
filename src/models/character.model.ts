import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class CharacterDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsBoolean()
  isActiveInFilms: boolean;

  @IsUUID()
  genderId: string;

  @IsArray()
  @IsUUID(undefined, { each: true })
  accomplices: string[];

  @IsArray()
  @IsUUID(undefined, { each: true })
  enemies: string[];
}
