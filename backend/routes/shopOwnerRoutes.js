import express from "express"

import {getShopOwners, getShopOwnerById} from "../controllers/shopOwnerController.js"
import { getProductsByShopOwner } from "../controllers/productController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getShopOwners); //used for homepage shops list
router.get("/:id", getShopOwnerById); //used when clicking shop card
router.get("/:id/products", getProductsByShopOwner); //shop owner dashboard

export default router;