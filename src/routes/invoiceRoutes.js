import express from 'express'
import { getInvoices } from '../controllers/invoiceController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/history', protect, getInvoices) // Get all invoices

export default router
