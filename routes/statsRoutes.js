import express from 'express'
import { getMyStats } from '../controllers/statsController.js'

export const statsRoutes = express.Router();

statsRoutes.get('/', (req, res) => {
    getMyStats(req, res)
})