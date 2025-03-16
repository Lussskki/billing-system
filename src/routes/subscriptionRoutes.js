import express from 'express'
import { createSubscription, getSubscription, updateSubscription, cancelSubscription } from '../controllers/subscriptionController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/create', protect, createSubscription) // Create subscription
router.get('/review', protect, getSubscription) // Review current subscription
router.put('/update', protect, updateSubscription) // Update subscription plan
router.delete('/cancel/', protect, cancelSubscription) // Cancel subscription

export default router
