import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserShortLinks1696410132886 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE user_entity ADD  COLUMN if not EXISTS short_links  VARCHAR(5000) ',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE user_entity DROP COLUMN short_links');
  }
}
