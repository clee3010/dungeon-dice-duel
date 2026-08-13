import { getDbConnection } from "../db/db.js";
import bcrypt from 'bcryptjs'

export async function registerUser(req, res) {
    let {name, username, password} = req.body;

    if (!name || !username || !password) {
        return res.status(400).json({ error: 'All fields are required.' })
    }

    name = name.trim();
    username = username.trim();

    if (!/^[a-zA-Z0-9_-]{1,20}$/.test(username)) {
        return res.status(400).json(
        { error: 'Username must be 1–20 characters, using letters, numbers, _ or -.' }
        )
    }

    try {
        const db = await getDbConnection();

        const exists = await db.get(`SELECT * FROM users WHERE username = ?`, [username])
        if (exists) {
            return res.status(400).json({error : "Username already in use"})
        }

        const hashed = await bcrypt.hash(password, 10)

        const result = await db.run('INSERT INTO users (name, username, password) VALUES (?, ?, ?)', [name, username, hashed])

        req.session.userId = result.lastID
        return res.status(201).json({ message: 'User registered'})

    } catch (err) {
        return res.status(500).json({ error : "Registration failed. Please try again."})
    }
}

export async function loginUser(req, res) {
    let {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'All fields are required.' })
    }

    username = username.trim();

    try {
        const db = await getDbConnection();

        const user = await db.get(`SELECT * FROM users WHERE username = ?`, [username])

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" })
        }
        
        const valid = await bcrypt.compare(password, user.password)
        if (!valid) {
            return res.status(401).json({ error: "Invalid credentials" })
        }

        req.session.userId = user.id
        res.status(200).json({message : 'Logged in'})

    } catch (err) {
        return res.status(500).json({ error : "Login failed. Please try again."})
    }
}

export function logoutUser(req, res) {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Logout failed' })
        }

        res.status(200).json({ message: 'Logged out' })
    })
}