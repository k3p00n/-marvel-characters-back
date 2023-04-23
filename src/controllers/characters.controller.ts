import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CharacterCreateDto } from 'src/models/character-create.model';
import { CharacterDto } from 'src/models/character.model';
import { CollectionResponse } from 'src/models/response.model';

@Controller('characters')
export class CharactersController {
  @Get()
  async getCharacters(
    @Query('name') name: string,
    @Query('age') age: number,
    @Query('isActiveInFilms') isActiveInFilms: boolean,
    @Query('genderId') genderId: string,
    @Query('offset') offset = 0,
    @Query('limit') limit = 10,
  ): Promise<CollectionResponse<CharacterDto>> {
    const characters: CharacterDto[] = [];
    return {
      data: characters,
      pagination: { offset, limit, total: characters.length },
    };
  }

  @Get(':id')
  async getCharacterById(id: string): Promise<CharacterDto> {
    return {} as CharacterDto;
  }

  @Get(':id/enemies')
  async getCharacterEnemies(
    @Param('id') id: string,
    @Query('offset') offset = 0,
    @Query('limit') limit = 10,
  ): Promise<CollectionResponse<CharacterDto>> {
    const enemies: CharacterDto[] = [];
    return {
      data: enemies,
      pagination: { offset, limit, total: enemies.length },
    };
  }

  @Get(':id/accomplices')
  async getCharacterAccomplices(
    @Param('id') id: string,
    @Query('offset') offset = 0,
    @Query('limit') limit = 10,
  ): Promise<CollectionResponse<CharacterDto>> {
    const accomplices: CharacterDto[] = [];
    return {
      data: accomplices,
      pagination: { offset, limit, total: accomplices.length },
    };
  }

  @Post()
  async createCharacter(
    @Body() characterCreateDto: CharacterCreateDto,
  ): Promise<CharacterDto> {
    return {} as CharacterDto;
  }

  @Post(':id/enemies')
  async addCharacterEnemy(
    @Param('id') id: string,
    @Body('enemyId') enemyId: string,
  ): Promise<CharacterDto> {
    return {} as CharacterDto;
  }

  @Post(':id/accomplices')
  async addCharacterAccomplice(
    @Param('id') id: string,
    @Body('accompliceId') accompliceId: string,
  ): Promise<CharacterDto> {
    return {} as CharacterDto;
  }

  @Put()
  async updateCharacter(
    @Body() characterUpdateDto: Partial<CharacterCreateDto>,
  ): Promise<CharacterDto> {
    return {} as CharacterDto;
  }

  @Delete(':id')
  async deleteCharacter(@Param('id') id: string): Promise<void> {
    return;
  }

  @Delete(':id/enemies/:enemyId')
  async deleteCharacterEnemy(
    @Param('id') id: string,
    @Param('enemyId') enemyId: string,
  ): Promise<void> {
    return;
  }

  @Delete(':id/accomplices/:accompliceId')
  async deleteCharacterAccomplice(
    @Param('id') id: string,
    @Param('accompliceId') accompliceId: string,
  ): Promise<void> {
    return;
  }
}
