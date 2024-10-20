import mongoose from'mongoose'

// Connect to MongoDB
const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected successfully')
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce_db`)
}

export default connectDB