import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1773220179358 implements MigrationInterface {
    name = 'InitialSchema1773220179358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`reaction\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`postId\` int NOT NULL, \`type\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`reaction\``);
    }

}
