import jwt from 'jsonwebtoken'

// Middleware to check if the user is an admin
const adminAuth = (req, res, next) => {
    try {
        const { token } = req.headers
        // Check if token exists
        if (!token) {
            return res.json({ succcess: false, message: 'Not authorized, login again' })
        }

        // Verify token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        // Check if token is valid
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ succcess: false, message: 'Not authorized, login again' })
        }
        next()
    } catch (error) {
        console.log(error)
        res.json({ succcess: false, message: error.message })
    }
}

export default adminAuth