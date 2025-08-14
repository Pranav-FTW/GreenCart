import jwt from 'jsonwebtoken'

// Seller Login: /api/seller/login
export const sellerLogin = async (req, res) => {
    try {
        const {email, password} = req.body
        
        if (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
            const token = jwt.sign(
                {
                    email,
                },
                process.env.JWT_SECRET,
                {expiresIn: '7d'}
            )
            
            return res
            .json({
                success: true,
                message: "Seller Logged In",
                token
            })
        }
         
        else {
            return res.json({
                success: false,
                message: "Invalid Credentials"
            })
        }

    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        })
    }
}

// Check Auth: /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
    try {
        return res.json({
            success: true
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        })
    }
}

// Logout Seller: /api/seller/logout

export const sellerLogout = async (req, res) => {
    try {
        return res
        .json({
            success: true,
            message: "Seller Logged out",
        })
        
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        })
    }
}