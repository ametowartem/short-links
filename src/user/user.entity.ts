import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  uuid: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  mail: string;

  @Column({ name: 'short_links' })
  shortLinks: string;

  constructor(
    username: string,
    password: string,
    mail?: string,
    shortLinks?: string,
    uuid?: number,
  ) {
    this.uuid = uuid;
    this.username = username;
    this.mail = mail;
    this.shortLinks = shortLinks;
    this.password = password;
  }
}
