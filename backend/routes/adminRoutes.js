import express from "express"

import {adminLogin, getPendingShops, getActiveShops, deleteShopOwner, deleteProduct, getSuspendedShops,getProducts, 
    reactivateShopOwner, getShopOwners, suspendShopOwner,getDashboardStats, activateShopOwner, getCustomers} 
    from "../controllers/adminController.js"

import verifyAdminToken from "../middleware/verifyAdminToken.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/dashboard", getDashboardStats);
router.get("/pending-shops", verifyAdminToken, getPendingShops)
router.get("/active-shops", verifyAdminToken, getActiveShops)
router.get("/suspended-shops", verifyAdminToken, getSuspendedShops)
router.put("/reactivate-shop/:id", reactivateShopOwner)
router.put("/activate-shopowner/:id", activateShopOwner);
router.get("/customers", getCustomers);
router.get("/shopowners", getShopOwners);
router.put("/:id/suspend", suspendShopOwner);
router.delete("/:id", deleteShopOwner);
router.delete("/products/:id", deleteProduct);
router.get("/", getProducts);

export default router;