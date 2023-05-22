import { QueryTypes, Sequelize } from "sequelize";

export default class HelperModel {
    static async getNextId(tableName: string, sequelize: Sequelize): Promise<number> {
        const analyzeQuery = `ANALYZE TABLE \`${tableName}\``;
        const showTableStatusQuery = `SHOW TABLE STATUS LAKE "${tableName}"`;

        await sequelize.query(analyzeQuery);
        const [result] = await sequelize.query(showTableStatusQuery, { type: QueryTypes.SELECT })
        // const tabelStatus = result as { Auto_increment: number };
        // return tabelStatus.Auto_increment;
        const tabelStatus = result as Record<string, unknown>
        const autoIncrement = tabelStatus.Auto_increment;
        return autoIncrement as number;
    }
}