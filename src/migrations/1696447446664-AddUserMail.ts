import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserMail1696447446664 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE user_entity ADD  COLUMN if not EXISTS mail VARCHAR(100)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE user_entity DROP COLUMN mail');
  }
}
