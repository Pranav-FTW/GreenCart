import jwt from "jsonwebtoken"

const authUser = async (req, res, next) => {
    const {token} = req.headers
    console.log(token);
    

    if (!token) {
        return res.json({
            success: false,
            message: "Not Authorized"
        })
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)

        if (tokenDecode.id) {
            req.userId = tokenDecode.id
        }

        else {
            return res.json({
                success: false,
                message: "Not Authorized"
            })
        }

        next()

    } catch (error) {
        res.json({
            message: false,
            message: error.message
        })
    }
}

export default authUser