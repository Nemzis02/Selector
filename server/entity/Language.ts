const { Entity, PrimaryGeneratedColumn, Column } = require('typeorm');

@Entity()
export class Language {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20,
  })
  name: string;

  @Column()
  rating: number;
}

module.exports = Language;
