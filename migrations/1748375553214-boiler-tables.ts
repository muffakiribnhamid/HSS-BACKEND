import { MigrationInterface, QueryRunner } from "typeorm";

export class BoilerTables1748375553214 implements MigrationInterface {
    name = 'BoilerTables1748375553214'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "academic_info" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isDelete" boolean NOT NULL DEFAULT false, "activeStatus" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "gradeApplyingFor" character varying NOT NULL, "previousSchool" character varying NOT NULL, "shortIntroduction" character varying NOT NULL, "studentId" uuid NOT NULL, CONSTRAINT "PK_f8f803c5c51f95882d24da87976" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bank_details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isDelete" boolean NOT NULL DEFAULT false, "activeStatus" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "accountHolderName" character varying NOT NULL, "accountNumber" character varying NOT NULL, "bankName" character varying NOT NULL, "IFSCCode" character varying NOT NULL, "studentId" uuid NOT NULL, CONSTRAINT "PK_ddbbcb9586b7f4d6124fe58f257" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."student_gender_enum" AS ENUM('Male', 'Female')`);
        await queryRunner.query(`CREATE TABLE "student" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isDelete" boolean NOT NULL DEFAULT false, "activeStatus" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "fullName" character varying NOT NULL, "address" character varying NOT NULL, "gender" "public"."student_gender_enum" NOT NULL, "dob" date NOT NULL, "fatherName" character varying NOT NULL, "motherName" character varying NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying NOT NULL, CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."StaffRecord_role_enum" AS ENUM('PROFESSOR', 'TEACHER', 'OTHER')`);
        await queryRunner.query(`CREATE TABLE "StaffRecord" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying NOT NULL, "address" character varying NOT NULL, "contact" character varying NOT NULL, "role" "public"."StaffRecord_role_enum" NOT NULL, "activeStatus" boolean NOT NULL DEFAULT true, "isDelete" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_0870736c906166452f30f447987" UNIQUE ("contact"), CONSTRAINT "PK_cb3d072f83ad935735993b1b96a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "master" ("id" SERIAL NOT NULL, "fullName" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9de9f71647696cbf8d477e79aa9" UNIQUE ("email"), CONSTRAINT "PK_1ad656927ad7cd2b8a20c27e44c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "academic_info" ADD CONSTRAINT "FK_ca5fca38fd09ee1a06c3a6ccbcf" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bank_details" ADD CONSTRAINT "FK_1564a6624bacd42d0cee1c465c9" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bank_details" DROP CONSTRAINT "FK_1564a6624bacd42d0cee1c465c9"`);
        await queryRunner.query(`ALTER TABLE "academic_info" DROP CONSTRAINT "FK_ca5fca38fd09ee1a06c3a6ccbcf"`);
        await queryRunner.query(`DROP TABLE "master"`);
        await queryRunner.query(`DROP TABLE "StaffRecord"`);
        await queryRunner.query(`DROP TYPE "public"."StaffRecord_role_enum"`);
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TYPE "public"."student_gender_enum"`);
        await queryRunner.query(`DROP TABLE "bank_details"`);
        await queryRunner.query(`DROP TABLE "academic_info"`);
    }

}
