import express from 'express'
import { registerUser, login } from '../controllers/userController.js'

const router = express.Router()

router.post('/register', registerUser) // User registration
router.post('/login', login) // User login

export default router
