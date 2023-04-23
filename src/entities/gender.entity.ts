import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CharacterEntity } from './character.entity';

@Entity({
  name: 'gender',
})
export class GenderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => CharacterEntity, (character) => character.gender)
  characters: CharacterEntity[];
}
