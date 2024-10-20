import jwt from 'jsonwebtoken'

// Middleware to authenticate user
const authUser = async (req, res, next) => {
    const { token } = req.headers

    // Check if token exists
    if (!token) {
        return res.json({ success: false, message: 'Not authorized, login again' })
    }

    try {
        // Verify token
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        
        req.body.userId = token_decoded.id
        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default authUser