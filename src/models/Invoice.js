import mongoose from 'mongoose'

const invoiceSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['paid', 'pending', 'failed'], default: 'pending' },
    dateIssued: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true }
}, { timestamps: true })

const Invoice = mongoose.model('Invoice', invoiceSchema)

export default Invoice
