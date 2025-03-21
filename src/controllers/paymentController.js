import PaymentMethod from '../models/PaymentMethod.js' // Adjust the path
import mongoose from 'mongoose'

// Add a new payment method
export const addPaymentMethod = async (req, res) => {
    try {
        const { cardNumber, expiryDate, cardType } = req.body
        const userId = req.user.id // Assume authentication is done

        const newPayment = new PaymentMethod({ userId, cardNumber, expiryDate, cardType })
        await newPayment.save()

        res.status(201).json({ message: 'Payment method added', payment: newPayment })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

// Get all payment methods for a user
export const getPaymentMethods = async (req, res) => {
    try {
        const userId = req.user.id
        const payments = await PaymentMethod.find({ userId })

        res.status(200).json({ payments })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

// Delete a payment method
export const deletePaymentMethod = async (req, res) => {
    try {
        const { id } = req.params
        
        // Check if the ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' })
        }
        
        // Check if the payment method exists
        const paymentMethod = await PaymentMethod.findById(id)
        if (!paymentMethod) {
            return res.status(404).json({ message: 'Payment method not found' })
        }

        // Delete the payment method
        await PaymentMethod.findByIdAndDelete(id)
        res.status(200).json({ message: 'Payment method deleted' })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}
