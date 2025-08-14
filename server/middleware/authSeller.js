import jwt from 'jsonwebtoken'

const authSeller = async (req, res, next) => {
    const {token} = req.headers

    if (!token) {
        return res.json({
            success: false,
            message: "Not Authorized"
        })
    }

    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)

        if (decodeToken.email === process.env.SELLER_EMAIL) {
            next()
        }
        
        else {
            return res.json({
                success: false,
                message: "Not Authorized"
            })
        }

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export default authSeller