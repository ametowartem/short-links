import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  uuid: number;
  @Column()
  username: string;
  @Column()
  password: string;

  constructor(username: string, password: string, uuid?: number) {
    this.uuid = uuid;
    this.username = username;
    this.password = password;
  }
}
