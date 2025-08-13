import express from "express"
import { upload } from "../config/multer.js"
import authSeller from "../middleware/authSeller.js"
import { addProduct, changeStock, productById, productList } from "../controllers/productController.js"

const productRoute = express.Router()

productRoute.post('/add', upload.array(["images"]), authSeller, addProduct)
productRoute.get('/list', productList)
productRoute.post('/id', productById)
productRoute.post('/stock', authSeller, changeStock)

export default productRoute