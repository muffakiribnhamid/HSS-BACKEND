import { MigrationInterface, QueryRunner } from "typeorm";

export class ContactUs1747229163349 implements MigrationInterface {
    name = 'ContactUs1747229163349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ContactUs" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_77f6f6a654486737bb12dda7477" UNIQUE ("email"), CONSTRAINT "PK_9fc9543689b5c4820416500ff9e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ContactUs"`);
    }

}
