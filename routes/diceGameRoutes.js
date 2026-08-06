import { createDiceGameEngine } from '../domain/diceGameEngine.js'
import { heroes } from '../data/heroes.js'
import express from 'express'
import { getHeroes, startGame, playRound, resetBattle } from '../controllers/diceGameController.js'

const engine = createDiceGameEngine(heroes);

export const diceGameRoutes = express.Router();

const allHeroes = diceGameRoutes.get('/heroes', (req, res) => {
    getHeroes(req, res, engine)
})

diceGameRoutes.post('/battle/start', (req, res) => {
    const heroId = heroes[Math.floor(Math.random() * heroes.length)].id
    startGame(req, res, engine, heroId)
})

diceGameRoutes.post('/battle/round', (req, res) => {
    playRound(req, res, engine)
})

diceGameRoutes.post('/battle/reset', (req, res) => {
    resetBattle(req, res, engine)
})

