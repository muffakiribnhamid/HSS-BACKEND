import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationStudentAdmission1748157800149 implements MigrationInterface {
    name = 'MigrationStudentAdmission1748157800149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "studentAdmission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying NOT NULL, "motherName" character varying NOT NULL, "fatherName" character varying NOT NULL, "address" character varying NOT NULL, "dob" date NOT NULL, "email" character varying NOT NULL, "contact" character varying NOT NULL, "gradeApplyingFor" character varying NOT NULL, "previousSchool" character varying NOT NULL, "lastGradeCompleted" character varying NOT NULL, "shortIntroduction" text NOT NULL, "accountHolderName" character varying NOT NULL, "accountNumber" bigint NOT NULL, "bankName" character varying NOT NULL, "IFSCCode" character varying NOT NULL, "photo" character varying NOT NULL, "marksheet" character varying NOT NULL, "aadhaarCard" character varying NOT NULL, "activeStatus" boolean NOT NULL DEFAULT true, "isDelete" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_6afb1e2c13d7e5d8bc765caa20a" UNIQUE ("email"), CONSTRAINT "UQ_52ad5729854cc2c8abdc29cccb5" UNIQUE ("contact"), CONSTRAINT "UQ_56de22d2815310cf3992cd842af" UNIQUE ("accountNumber"), CONSTRAINT "UQ_0b7ceab0bc25a238d8948c0b862" UNIQUE ("IFSCCode"), CONSTRAINT "PK_591df333f13e34aec08e13dad8a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "studentAdmission"`);
    }

}
