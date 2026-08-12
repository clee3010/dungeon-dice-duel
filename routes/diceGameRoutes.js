import { createDiceGameEngine } from '../domain/diceGameEngine.js'
import { getAllHeroes } from '../db/heroes.js'
import express from 'express'
import { getHeroes, startGame, playRound, resetBattle } from '../controllers/diceGameController.js'
import { createRun } from '../db/runs.js'
import { updateRunStats } from '../db/runs.js'

const engine = createDiceGameEngine(await getAllHeroes());

export const diceGameRoutes = express.Router();

diceGameRoutes.get('/heroes', (req, res) => {
    getHeroes(req, res, engine)
})

diceGameRoutes.post('/battle/start', async (req, res) => {
    const heroId = req.body.heroId;
    if (!heroId) {
        return res.status(400).json({ "message":  "Hero ID is required" })
    }

    req.session.userId = 1;
    req.session.runId = await createRun(req.session.userId);
    startGame(req, res, engine, heroId)
})

diceGameRoutes.post('/battle/round', async (req, res) => {
    const roundInfo = playRound(req, res, engine)

    if (roundInfo.outcome !== 'ongoing') {
        await updateRunStats(req.session.runId, roundInfo.outcome)
    }

})

diceGameRoutes.post('/battle/reset', (req, res) => {
    resetBattle(req, res, engine)
})

