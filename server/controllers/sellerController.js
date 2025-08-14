import jwt from 'jsonwebtoken'

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // only true in production
    sameSite: "none", // lax for dev
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000
};

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
            .cookie("sellerToken", token, cookieOptions)
            .json({
                success: true,
                message: "Seller Logged In"
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
        .cookie("sellerToken", token, cookieOptions)
        .json({
            success: true,
            message: "Seller Logged out"
        })
        
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        })
    }
}