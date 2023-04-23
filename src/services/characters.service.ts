import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CharacterEntity } from 'src/entities/character.entity';
import { CharacterCreateDto } from 'src/models/character-create.model';
import { CharacterDto } from 'src/models/character.model';
import { Equal, FindOperator, Like, Repository } from 'typeorm';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(CharacterEntity)
    private readonly characterRepository: Repository<CharacterEntity>,
  ) {}

  async findAll(
    offset = 0,
    limit = 10,
    filters: {
      name?: string;
      age?: number;
      isActiveInFilms?: boolean;
      genderId?: string;
    },
  ): Promise<{ data: CharacterEntity[]; total: number }> {
    const searchCondition: {
      [key: string]:
        | FindOperator<string | number | boolean>
        | { [key: string]: FindOperator<string | number | boolean> };
    } = {
      name: Like(`%${filters.name || ''}%`),
    };
    if (filters.age) {
      searchCondition.age = Equal(filters.age);
    }
    if (filters.isActiveInFilms) {
      searchCondition.isActiveInFilms = Equal(filters.isActiveInFilms);
    }
    if (filters.genderId) {
      searchCondition['gender'] = {
        id: Equal(filters.genderId),
      };
    }
    const [data, total] = await this.characterRepository.findAndCount({
      where: searchCondition,
      skip: offset,
      take: limit,
    });
    return { data, total };
  }

  async create(characterCreateDto: CharacterCreateDto): Promise<CharacterDto> {
    const character = await this.characterRepository.save({
      name: characterCreateDto.name,
      age: characterCreateDto.age,
      isActiveInFilms: characterCreateDto.isActiveInFilms,
      gender: { id: characterCreateDto.genderId },
    });
    return {
      ...character,
      genderId: characterCreateDto.genderId,
      enemies: [],
      accomplices: [],
    };
  }

  async addAccomplice(
    characterId: string,
    accompliceId: string,
  ): Promise<CharacterDto> {
    await this.characterRepository.manager
      .createQueryBuilder()
      .relation(CharacterEntity, 'accomplices')
      .of(characterId)
      .add(accompliceId);

    const character = await this.characterRepository.findOne({
      relations: ['gender'],
      select: [
        'id',
        'name',
        'age',
        'isActiveInFilms',
        'gender',
        'enemies',
        'accomplices',
      ],

      where: { id: characterId },
    });
    if (!character) {
      throw new Error('Character not found');
    }
    return {
      ...character,
      genderId: character.gender.id,
      enemies: character.enemies?.map((enemy) => enemy.id),
      accomplices: character.accomplices?.map((accomplice) => accomplice.id),
    };
  }
}
