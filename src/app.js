import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import paymentRoutes from './routes/paymentRoutes.js'
import invoiceRoutes from './routes/invoiceRoutes.js'
import subscriptionRoutes from './routes/subscriptionRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB error:', err))

// Routes
app.use('/api/payments', paymentRoutes)
app.use('/api/invoices', invoiceRoutes)
app.use('/api/subscriptions', subscriptionRoutes)
app.use('/api/users', userRoutes)

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
