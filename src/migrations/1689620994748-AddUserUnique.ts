import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserUnique1689620994748 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE UNIQUE INDEX if not EXISTS uq__user_entity__username on user_entity(username)',
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP UNIQUE INDEX uq__user_entity__username');
  }
}
