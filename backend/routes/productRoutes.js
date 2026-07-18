import express from "express"

import {getProducts, getNewArrivals, getProductsByShopOwner,updateProduct, searchProducts,addProduct,deleteProduct, getProductsByCategory, getSecondHandProducts} from "../controllers/productController.js"
import verifyToken from "../middleware/verifyToken.js";
import upload from "../middleware/upload.js"

const router = express.Router();

router.get("/", getProducts);
router.get("/new-arrivals", getNewArrivals);
router.get("/shopowner/:id", getProductsByShopOwner);
router.post("/",verifyToken,upload.fields([{name:"thumbnail",maxCount:10},{name:"preview",maxCount:10}]), addProduct);
router.delete("/:id",verifyToken, deleteProduct);
router.put("/:id",verifyToken,upload.fields([{name:"thumbnail",maxCount:10},{name:"preview",maxCount:10}]), updateProduct);
router.get("/category/:id", getProductsByCategory);
router.get("/second-hand", getSecondHandProducts);
router.get("/search", searchProducts);

export default router;