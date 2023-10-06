import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserAvatarPath1696599234617 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE user_entity ADD COLUMN avatar_path VARCHAR(200)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE user_entity DROP COLUMN avatar_path');
  }
}
