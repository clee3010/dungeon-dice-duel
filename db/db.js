import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'path'

export async function getDbConnection() {
    const dbPath = path.join('database.db')

    return open ({
        filename : dbPath,
        driver : sqlite3.Database
    })
}

export async function initializeDatabase() {
    
    const db = await getDbConnection();

    await db.exec(
        `CREATE TABLE IF NOT EXISTS heroes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            attackPower INTEGER NOT NULL,
            defensePower INTEGER NOT NULL,
            maxHp INTEGER NOT NULL,
            imageUrl TEXT NOT NULL
        )`
    );

    await db.exec(
        `CREATE TABLE IF NOT EXISTS runs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            total_battles INTEGER NOT NULL,
            wins INTEGER NOT NULL,
            losses INTEGER NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )`
    )

    await db.exec(
        `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )`
    )

    return db;
}

