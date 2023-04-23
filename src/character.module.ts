import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CharacterEntity } from './entities/character.entity';
import { CharactersService } from './services/characters.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharactersController } from './controllers/characters.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CharacterEntity]), ConfigModule],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class DoctorModule {}
