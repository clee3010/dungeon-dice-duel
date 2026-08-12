import express from 'express'
import { diceGameRoutes } from './routes/diceGameRoutes.js'
import { initializeDatabase } from './db/db.js'
import session from 'express-session'

const app = express()
const PORT = 8000

const secret = 'tempsecret'

app.use(express.json())
app.use(express.static('public'))
app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
  }
}))

const db = await initializeDatabase();

app.use('/api', diceGameRoutes)



app.listen(PORT, () => { 
  console.log(`Server running at http://localhost:${PORT}`)
}).on('error', (err) => {
  console.error('Failed to start server:', err)
}) 