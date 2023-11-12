import { MigrationInterface, QueryRunner } from "typeorm"

export class PrepopulateFoods1699800061095 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "INSERT INTO `food` (`name`, `price`) VALUES ('Ketoprak', '15000');"
        )
        await queryRunner.query(
            "INSERT INTO `food` (`name`, `price`) VALUES ('Nasi Goreng', '13000');"
        )
        await queryRunner.query(
            "INSERT INTO `food` (`name`, `price`) VALUES ('Bubur Ayam', '11000');"
        )
        await queryRunner.query(
            "INSERT INTO `food` (`name`, `price`) VALUES ('Mie Ayam', '13000');"
        )
        await queryRunner.query(
            "INSERT INTO `food` (`name`, `price`) VALUES ('Ayam Geprek', '15000');"
        )
        await queryRunner.query(
            "INSERT INTO `food` (`name`, `price`) VALUES ('Pecel Ayam', '25000');"
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
