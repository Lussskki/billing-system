import Invoice from '../models/Invoice.js'
import PDFDocument from 'pdfkit'

// Get all invoices for a user
export const getInvoices = async (req, res) => {
    try {
        const userId = req.user.id
        const invoices = await Invoice.find({ userId })

        res.status(200).json({ invoices }) // Return invoice history as JSON
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

// Generate and download an invoice as a PDF
export const downloadInvoice = async (req, res) => {
    try {
        const { id } = req.params // Get invoice ID from URL
        const invoice = await Invoice.findById(id)

        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' })
        }

        // Set response headers for file download
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', `attachment; filename=invoice-${id}.pdf`)

        // Create a PDF document
        const pdfDoc = new PDFDocument()
        pdfDoc.pipe(res) // Stream PDF to response

        // Add invoice details to the PDF
        pdfDoc.fontSize(20).text('Invoice', { align: 'center' })
        pdfDoc.moveDown()
        pdfDoc.text(`Invoice ID: ${invoice._id}`)
        pdfDoc.text(`User ID: ${invoice.userId}`)
        pdfDoc.text(`Amount: $${invoice.amount}`)
        pdfDoc.text(`Date: ${invoice.date}`)

        pdfDoc.end() // Finalize the PDF
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}
