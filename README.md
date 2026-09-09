# Dungeon Dice Duel

Dungeon Dice Duel is a browser-based, turn-based battle game backed by an Express.js API. Players create an account, choose a hero, battle a randomly selected opponent, and track their wins, losses, total battles, and best run.

This project focuses on backend game-state management, REST API design, session-based authentication, and relational data persistence.

## Features

- Account registration, login, logout, and authentication-state checks
- Password hashing with bcrypt
- Session-based user and battle-run tracking
- Twelve heroes with different attack, defense, and health statistics
- Server-side dice rolls, damage calculation, HP updates, and battle outcomes
- Persistent player statistics stored in SQLite
- Responsive browser interface with hero selection and roll animations

## How Battles Work

1. The player selects a hero.
2. The server randomly chooses a different hero as the opponent.
3. Each round generates attack and defense rolls for both heroes.
4. Damage is calculated as the attack roll minus the opposing defense roll, with a minimum of zero.
5. The battle continues until the player, opponent, or both reach zero HP.
6. The completed battle updates the authenticated player's run statistics.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** SQLite
- **Authentication:** express-session, bcryptjs
- **Frontend:** HTML, CSS, JavaScript

## Architecture

The backend separates HTTP routing, request handling, game rules, and persistence:

```text
routes/       API route definitions
controllers/  Request validation and HTTP responses
domain/       Battle engine and combat rules
db/           SQLite queries and database initialization
public/       Browser UI and client-side JavaScript
```

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
git clone https://github.com/clee3010/dungeon-dice-duel.git
cd dungeon-dice-duel
npm install
npm start
```

Open [http://localhost:8000](http://localhost:8000), create an account, and sign in to begin a battle.

The application automatically creates the required SQLite tables when the server starts.

### Starting with a Fresh Database

If `database.db` is removed, initialize and seed a new database with the hero roster:

```bash
npm start
# Stop the server after initialization with Ctrl+C.
node seedHeroes.js
npm start
```

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Create a user and begin a session |
| `POST` | `/api/auth/login` | Authenticate an existing user |
| `POST` | `/api/auth/logout` | Destroy the current session |
| `GET` | `/api/auth/me` | Return the current authentication state |
| `GET` | `/api/heroes` | Retrieve the available heroes |
| `POST` | `/api/battle/start` | Start a battle using a selected hero ID |
| `POST` | `/api/battle/round` | Play one combat round |
| `POST` | `/api/battle/reset` | Reset the battle and create a new run |
| `GET` | `/api/stats` | Retrieve statistics for the signed-in user |

Example request to start a battle:

```json
{
  "heroId": 3
}
```

## Database

The SQLite database contains three tables:

- `users`: account information and hashed passwords
- `heroes`: hero names, combat statistics, health, and image URLs
- `runs`: total battles, wins, losses, creation time, and associated user

Player totals and best-run statistics are calculated from stored run records.

## License

This project is available under the ISC License.
