import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaCheck1773411102225 implements MigrationInterface {
    name = 'SchemaCheck1773411102225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reaction\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`reaction\` CHANGE \`postId\` \`postId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`reaction\` ADD CONSTRAINT \`FK_e58a09ab17e3ce4c47a1a330ae1\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reaction\` ADD CONSTRAINT \`FK_dc3aeb83dc815f9f22ebfa7785f\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reaction\` DROP FOREIGN KEY \`FK_dc3aeb83dc815f9f22ebfa7785f\``);
        await queryRunner.query(`ALTER TABLE \`reaction\` DROP FOREIGN KEY \`FK_e58a09ab17e3ce4c47a1a330ae1\``);
        await queryRunner.query(`ALTER TABLE \`reaction\` CHANGE \`postId\` \`postId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`reaction\` CHANGE \`userId\` \`userId\` int NOT NULL`);
    }

}
