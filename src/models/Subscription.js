import mongoose from 'mongoose'

const subscriptionSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    plan: { type: String, enum: ['basic', 'premium', 'enterprise'], required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ['active', 'canceled', 'expired'], default: 'active' },
    endDate: { type: Date, required: true },
}, { timestamps: true })

const Subscription = mongoose.model('Subscription', subscriptionSchema)

export default Subscription
