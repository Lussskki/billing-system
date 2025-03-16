import Subscription from '../models/Subscription.js' // Adjust the path
import mongoose from 'mongoose'

// Create subscription
export const createSubscription = async (req, res) => {
    try {
        const userId = req.user.id // Get user ID from authentication middleware
        const { plan } = req.body

        // Validate the selected plan
        const validPlans = ['basic', 'premium', 'enterprise']
        if (!validPlans.includes(plan)) {
            return res.status(400).json({ message: 'Invalid subscription plan' })
        }

        // Check if the user already has an active subscription
        const existingSubscription = await Subscription.findOne({ userId, status: 'active' })
        if (existingSubscription) {
            return res.status(400).json({ message: 'You already have an active subscription' })
        }

        // Calculate the end date (e.g., 1 month from now)
        const startDate = new Date()
        const endDate = new Date()
        endDate.setMonth(endDate.getMonth() + 1) // Adds 1 month to the start date

        // Create a new subscription
        const newSubscription = new Subscription({
            userId,
            plan,
            startDate,
            endDate,
            status: 'active'
        })

        await newSubscription.save()

        res.status(201).json({ message: 'Subscription created successfully', subscription: newSubscription })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}



// Get subscription details
export const getSubscription = async (req, res) => {
    try {
        const userId = req.user.id
        const subscription = await Subscription.find({ userId })

        if (!subscription) {
            return res.status(404).json({ message: 'No subscription found' })
        }

        // Determine subscription status
        const currentDate = new Date()
        let status = subscription.status  // Get status from DB

        if (status === 'canceled') {
            return res.status(200).json({ message: 'Subscription canceled', status, subscription })
        }

        if (subscription.endDate && subscription.endDate < currentDate) {
            status = 'expired'
            return res.status(200).json({ message: 'Subscription expired', status, subscription })
        }

        res.status(200).json({ message: 'All subscription', status, subscription })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}


// Update subscription plan
export const updateSubscription = async (req, res) => {
    try {
        const userId = req.user.id
        const { plan } = req.body

        // Check if the plan is valid
        const validPlans = ['basic', 'premium', 'enterprise']
        if (!validPlans.includes(plan)) {
            return res.status(400).json({ message: 'Invalid subscription plan' })
        }

        // Find existing subscription
        let subscription = await Subscription.findOne({ userId, status: 'active' })

        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' })
        }

        // Update the plan
        subscription.plan = plan
        subscription.startDate = new Date()
        subscription.endDate = new Date(new Date().setMonth(new Date().getMonth() + 1)) // Extend for 1 month

        await subscription.save()

        res.status(200).json({ message: 'Subscription updated', subscription })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}




// Cancel a subscription
export const cancelSubscription = async (req, res) => {
    try {
        const userId = req.user.id  // Ensure token contains the correct userId
        

        // Convert userId to ObjectId for MongoDB query
        const subscription = await Subscription.findOne({ 
            userId: new mongoose.Types.ObjectId(userId),
            status: "active"
        })

        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' })
        }

        // Cancel subscription
        subscription.status = 'canceled'
        subscription.endDate = new Date() // Set cancellation date

        await subscription.save()

        res.status(200).json({ message: 'Subscription canceled', subscription })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

