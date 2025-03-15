import Invoice from '../models/Invoice.js'

// Get all invoices for a user
export const getInvoices = async (req, res) => {
    try {
        const userId = req.user.id
        const invoices = await Invoice.find({ userId })

        res.status(200).json({ invoices })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}
