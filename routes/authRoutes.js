import express from 'express'
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js';

export const authRoutes = express.Router();

authRoutes.post('/register', (req, res) => {
    registerUser(req, res)
})

authRoutes.post('/login', (req, res) => {
    loginUser(req, res)
})

authRoutes.post('/logout', (req, res) => {
    logoutUser(req, res)
})
