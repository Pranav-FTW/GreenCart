import cookieParser from "cookie-parser"
import express from "express"
import cors from 'cors'
import connetDB from "./config/db.js"
import 'dotenv/config'
import userRoute from "./routes/userRoutes.js"
import sellerRoute from "./routes/sellerRoutes.js"
import connectCloudinary from "./config/cloudinary.js"
import productRoute from "./routes/productRoutes.js"
import cartRoute from "./routes/cartRoutes.js"
import addressRoute from "./routes/addressRoutes.js"
import orderRoute from "./routes/orderRoutes.js"
import { stripeWebhook } from "./controllers/orderController.js"

const app = express()
const port = process.env.PORT || 4000
// Allow multiple origins
const allowedOrigins = ['http://localhost:5173', 'https://greencart-five-drab.vercel.app']

app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhook)

await connetDB()
await connectCloudinary()

// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))

app.get('/', (req, res) => {
    res.send("API Working")
})
app.use('/api/user', userRoute)
app.use('/api/seller', sellerRoute)
app.use('/api/product', productRoute)
app.use('/api/cart', cartRoute)
app.use('/api/address', addressRoute)
app.use('/api/order', orderRoute)


app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}` );
})