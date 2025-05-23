import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTeacher1748005438425 implements MigrationInterface {
    name = 'AddTeacher1748005438425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "auth" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_62079b42ede8798e6ea2bb6d144" UNIQUE ("name"), CONSTRAINT "UQ_b54f616411ef3824f6a5c06ea46" UNIQUE ("email"), CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "auth"`);
    }

}
