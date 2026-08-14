import { getDbConnection } from "./db.js";

export async function createRun(userId) {
    const db = await getDbConnection();

    const newRun = await db.run(`INSERT INTO runs (user_id, total_battles, wins, losses)
        VALUES (?, ?, ?, ?)`, [userId, 0, 0, 0]
    );

    return newRun.lastID;
}

export async function updateRunStats(runId, outcome) {
    const db = await getDbConnection();

     await db.run(`
            UPDATE runs 
            SET total_battles = total_battles + 1
            WHERE id = ?`, [runId])
            
    if (outcome === 'player_win') {
        await db.run(`
            UPDATE runs 
            SET 
                wins = wins + 1
            WHERE id = ?`, [runId])

    } else if (outcome === 'player_loss') {
        await db.run(`
            UPDATE runs 
            SET 
                losses = losses + 1
            WHERE id = ?`, [runId])
    }

}
