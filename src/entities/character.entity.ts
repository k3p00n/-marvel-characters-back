import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GenderEntity } from './gender.entity';

@Entity({
  name: 'character',
})
export class CharacterEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column({
    name: 'film_status',
  })
  isActiveInFilms: boolean;

  @ManyToMany(() => CharacterEntity, (character) => character.enemies)
  @JoinTable({
    name: 'enemy',
    joinColumn: {
      name: 'character_id',
      referencedColumnName: 'id',
    },
  })
  enemies: CharacterEntity[];

  @ManyToMany(() => CharacterEntity, (character) => character.accomplices)
  @JoinTable({
    name: 'accomplice',
    joinColumn: {
      name: 'character_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'accomplice_id',
      referencedColumnName: 'id',
    },
  })
  accomplices: CharacterEntity[];

  @ManyToOne(() => GenderEntity, (gender) => gender.characters)
  @JoinColumn({
    name: 'gender_id',
  })
  gender: GenderEntity;
}
