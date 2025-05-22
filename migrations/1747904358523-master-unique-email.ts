import { MigrationInterface, QueryRunner } from "typeorm";

export class MasterUniqueEmail1747904358523 implements MigrationInterface {
    name = 'MasterUniqueEmail1747904358523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "auth" ADD CONSTRAINT "UQ_auth_email" UNIQUE ("email")`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "auth" DROP CONSTRAINT "UQ_auth_email"`
        );
    }
}
