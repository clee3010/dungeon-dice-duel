import { getDbConnection } from "../db/db.js";

export async function getAuthState(req, res) {
    try {
        if (!req.session.userId) {
            return res.json({ isLoggedIn: false })
        }

        const db = await getDbConnection();

        const user = await db.get(`SELECT * FROM users WHERE id = ?`, [req.session.userId])

        if (!user) {
            return res.json({ isLoggedIn: false });
        }

        res.status(200).json({ isLoggedIn: true, name : user.name })
    } catch (err) {
        res.status(500).json({ "error": "Internal server error" })
    }
}