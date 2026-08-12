import { getDbConnection } from "./db.js";

export async function getAllHeroes() {
    const db = await getDbConnection();

    const heroes = await db.all(`SELECT * FROM heroes`);

    return heroes;
}

