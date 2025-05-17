import { MigrationInterface, QueryRunner } from "typeorm";

export class UserInfo1747295481201 implements MigrationInterface {
    name = 'UserInfo1747295481201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "StudentsInfo" ("id" SERIAL NOT NULL, "fullName" character varying NOT NULL, "motherName" character varying NOT NULL, "fatherName" character varying NOT NULL, "address" character varying NOT NULL, "dob" date NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "gradeApplyingFor" character varying NOT NULL, "previousSchool" character varying NOT NULL, "lastGradeCompleted" character varying NOT NULL, "shortIntroduction" text NOT NULL, "accountHolderName" character varying NOT NULL, "accountNumber" integer NOT NULL, "bankName" character varying NOT NULL, "IFSCCode" character varying NOT NULL, "photo" character varying NOT NULL, "marksheet" character varying NOT NULL, "aadhaarCard" character varying NOT NULL, CONSTRAINT "PK_9ec94878339941efb3c8bc19b49" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "StudentsInfo"`);
    }

}
