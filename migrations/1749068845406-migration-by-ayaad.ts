import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationByAyaad1749068845406 implements MigrationInterface {
    name = 'MigrationByAyaad1749068845406'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."StaffRecord_role_enum" RENAME TO "StaffRecord_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."StaffRecord_role_enum" AS ENUM('PRINCIPAL', 'SR_LECTURER', 'LECTURER', 'MASTER', 'TEACHER', 'LIBRARIAN', 'SR_ASSISTANT', 'JR_ASSISTANT', 'LAB_ASSISTANT', 'LIB_ASSISTANT', 'LIB_BEARER', 'MTS', 'OTHER')`);
        await queryRunner.query(`ALTER TABLE "StaffRecord" ALTER COLUMN "role" TYPE "public"."StaffRecord_role_enum" USING "role"::"text"::"public"."StaffRecord_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."StaffRecord_role_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."StaffRecord_role_enum_old" AS ENUM('PROFESSOR', 'TEACHER', 'OTHER')`);
        await queryRunner.query(`ALTER TABLE "StaffRecord" ALTER COLUMN "role" TYPE "public"."StaffRecord_role_enum_old" USING "role"::"text"::"public"."StaffRecord_role_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."StaffRecord_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."StaffRecord_role_enum_old" RENAME TO "StaffRecord_role_enum"`);
    }

}
