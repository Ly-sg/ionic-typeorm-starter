import { MigrationInterface, QueryRunner } from "typeorm"

export class initPosts1684256229265 implements MigrationInterface {
    name: string = "initPosts1684256229265";

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.info("Running initPosts1684256229265 migration UP");
        
        await queryRunner.query(`CREATE TABLE post (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            title TEXT NOT NULL,
            text TEXT NOT NULL
          )
        `);
        /*await queryRunner.createTable(new Table({
            name: "post",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "text",
                    type: "text",
                }
            ]
        }), true)*/
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "post";`);
    }

}
