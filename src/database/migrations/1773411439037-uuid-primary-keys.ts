import { MigrationInterface, QueryRunner } from 'typeorm';

export class UuidPrimaryKeys1773411439037 implements MigrationInterface {
  name = 'UuidPrimaryKeys1773411439037';

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (!(await queryRunner.hasColumn('user', 'id_uuid'))) {
      await queryRunner.query(`ALTER TABLE \`user\` ADD \`id_uuid\` varchar(36) NULL`);
    }
    await queryRunner.query(`UPDATE \`user\` SET \`id_uuid\` = UUID()`);

    if (!(await queryRunner.hasColumn('post', 'id_uuid'))) {
      await queryRunner.query(`ALTER TABLE \`post\` ADD \`id_uuid\` varchar(36) NULL`);
    }
    if (!(await queryRunner.hasColumn('post', 'user_uuid'))) {
      await queryRunner.query(`ALTER TABLE \`post\` ADD \`user_uuid\` varchar(36) NULL`);
    }
    await queryRunner.query(`UPDATE \`post\` SET \`id_uuid\` = UUID()`);
    await queryRunner.query(
      `UPDATE \`post\` p LEFT JOIN \`user\` u ON p.\`userId\` = u.\`id\` SET p.\`user_uuid\` = u.\`id_uuid\``,
    );

    if (!(await queryRunner.hasColumn('reaction', 'id_uuid'))) {
      await queryRunner.query(`ALTER TABLE \`reaction\` ADD \`id_uuid\` varchar(36) NULL`);
    }
    if (!(await queryRunner.hasColumn('reaction', 'user_uuid'))) {
      await queryRunner.query(`ALTER TABLE \`reaction\` ADD \`user_uuid\` varchar(36) NULL`);
    }
    if (!(await queryRunner.hasColumn('reaction', 'post_uuid'))) {
      await queryRunner.query(`ALTER TABLE \`reaction\` ADD \`post_uuid\` varchar(36) NULL`);
    }
    await queryRunner.query(`UPDATE \`reaction\` SET \`id_uuid\` = UUID()`);
    await queryRunner.query(
      `UPDATE \`reaction\` r LEFT JOIN \`user\` u ON r.\`userId\` = u.\`id\` SET r.\`user_uuid\` = u.\`id_uuid\``,
    );
    await queryRunner.query(
      `UPDATE \`reaction\` r LEFT JOIN \`post\` p ON r.\`postId\` = p.\`id\` SET r.\`post_uuid\` = p.\`id_uuid\``,
    );

    await this.dropForeignKeyIfExists(queryRunner, 'reaction', 'FK_dc3aeb83dc815f9f22ebfa7785f');
    await this.dropForeignKeyIfExists(queryRunner, 'reaction', 'FK_e58a09ab17e3ce4c47a1a330ae1');
    await this.dropForeignKeyIfExists(queryRunner, 'post', 'FK_5c1cf55c308037b5aca1038a131');

    await queryRunner.query(`ALTER TABLE \`reaction\` CHANGE \`id\` \`id\` int NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`id\` \`id\` int NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`id\` \`id\` int NOT NULL`);

    await queryRunner.query(`ALTER TABLE \`reaction\` DROP PRIMARY KEY`);
    await queryRunner.query(`ALTER TABLE \`post\` DROP PRIMARY KEY`);
    await queryRunner.query(`ALTER TABLE \`user\` DROP PRIMARY KEY`);

    await queryRunner.query(`ALTER TABLE \`reaction\` DROP COLUMN \`id\``);
    await queryRunner.query(`ALTER TABLE \`reaction\` DROP COLUMN \`userId\``);
    await queryRunner.query(`ALTER TABLE \`reaction\` DROP COLUMN \`postId\``);

    await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`id\``);
    await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`userId\``);

    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`id\``);

    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`id_uuid\` \`id\` varchar(36) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` ADD PRIMARY KEY (\`id\`)`);

    await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`id_uuid\` \`id\` varchar(36) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`user_uuid\` \`userId\` varchar(36) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`post\` ADD PRIMARY KEY (\`id\`)`);

    await queryRunner.query(`ALTER TABLE \`reaction\` CHANGE \`id_uuid\` \`id\` varchar(36) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`reaction\` CHANGE \`user_uuid\` \`userId\` varchar(36) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`reaction\` CHANGE \`post_uuid\` \`postId\` varchar(36) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`reaction\` ADD PRIMARY KEY (\`id\`)`);

    await queryRunner.query(
      `ALTER TABLE \`post\` ADD CONSTRAINT \`FK_5c1cf55c308037b5aca1038a131\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reaction\` ADD CONSTRAINT \`FK_e58a09ab17e3ce4c47a1a330ae1\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reaction\` ADD CONSTRAINT \`FK_dc3aeb83dc815f9f22ebfa7785f\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(): Promise<void> {
    throw new Error('Down migration is not supported safely for UUID primary key conversion.');
  }

  private async dropForeignKeyIfExists(
    queryRunner: QueryRunner,
    tableName: string,
    foreignKeyName: string,
  ) {
    const table = await queryRunner.getTable(tableName);
    const foreignKey = table?.foreignKeys.find((fk) => fk.name === foreignKeyName);

    if (foreignKey) {
      await queryRunner.query(`ALTER TABLE \`${tableName}\` DROP FOREIGN KEY \`${foreignKeyName}\``);
    }
  }
}
