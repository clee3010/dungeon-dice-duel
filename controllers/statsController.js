//import { getDbConnection } from "../db/db.js";
import { getStats } from '../db/stats.js';

export async function getMyStats(req, res) {
    try {
        const stats = await getStats(req);
        res.json({stats : stats});

    } catch (err) {
        res.status(500).json({"error" : "failed to recieve user stats"})
    }

}