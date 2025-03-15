import express from 'express'
import { addPaymentMethod, getPaymentMethods, deletePaymentMethod } from '../controllers/paymentController.js'
import { protect } from '../middleware/authMiddleware.js' // Ensure user is authenticated

const router = express.Router()

router.post('/add', protect, addPaymentMethod) // Add a payment method
router.get('/list', protect, getPaymentMethods) // Get all payment methods
router.delete('/delete/:id', protect, deletePaymentMethod) // Delete a payment method

export default router
