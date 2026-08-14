import { getDbConnection } from "./db.js";

export async function getStats(req) {
    const db = await getDbConnection();

    const stats = await db.get(`
        SELECT 
            COALESCE(SUM(total_battles), 0) AS total_battles,
            COALESCE(SUM(wins), 0) AS total_wins,
            COALESCE(SUM(losses), 0) AS total_losses,
            COALESCE(MAX(wins), 0) AS best_run
        FROM runs 
        WHERE user_id = ?`, [req.session.userId]);

    return stats
}