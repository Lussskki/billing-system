import mongoose from 'mongoose'

const paymentMethodSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
    cardNumber: { type: String, required: true }, // Store last 4 digits for security
    expiryDate: { type: String, required: true },
    cardType: { type: String, required: true } // e.g., Visa, MasterCard
}, { timestamps: true })

const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema)

export default PaymentMethod
