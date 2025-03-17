import express from 'express'
import { getInvoices, downloadInvoice } from '../controllers/invoiceController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/history', protect, getInvoices) // Get all invoices
router.get('/download/:id', protect, downloadInvoice) // Download a specific invoice as PDF

export default router
