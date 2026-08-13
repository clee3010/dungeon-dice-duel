import express from 'express'
import { getAuthState } from '../controllers/meController.js'

export const meRoutes = express.Router();

meRoutes.get('/', (req, res) => {
    getAuthState(req, res)
})