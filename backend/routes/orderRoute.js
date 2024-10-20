import express from 'express'
import { placeOrder, placeOrderStripe, verifyStripe, allOrders, userOrders, updateStatus } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// Routes for admin feautures
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// Routes for payment gateway feautures
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)

// Routes for user feautures
orderRouter.post('/userorders', authUser, userOrders)

// Routes for verify payment
orderRouter.post('/verifyStripe', authUser, verifyStripe)

export default orderRouter