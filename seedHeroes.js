import { initializeDatabase } from "./db/db.js";
import { heroes } from "./data/heroes.js";

const db = await initializeDatabase();

try {
    await db.exec("BEGIN TRANSACTION")

    for (const hero of heroes) {
        await db.run(
        `INSERT INTO heroes (name, attackPower, defensePower, maxHp, imageUrl)
        VALUES (?,?,?,?,?)`, 
        [hero.name, hero.attackPower, hero.defensePower, hero.maxHp, hero.imageUrl])
    }

    await db.exec("COMMIT")
    console.log('All records inserted successfully.')
    
} catch (err) {
    await db.exec("ROLLBACK")
    console.error('Error inserting data:', err.message)
} finally {
    await db.close();
}