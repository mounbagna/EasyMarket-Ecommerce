import express from "express";
import cors from "cors";
import fs from "fs";

import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import shopOwnerRoutes from "./routes/shopOwnerRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"

dotenv.config();

const app = express();

app.use(cors({origin: "http://localhost:3000", methods: ["GET", "POST", "PUT", "DELETE"], credentials: true})); //CORS FIX
app.use(express.json({limit: "50mb"})); //BODY PARSER
app.use(express.urlencoded({extended:true,limit: "50mb"})) //Form requests (optional)
app.use("/uploads", express.static("uploads")); //STATIC FILE ACCESS

if (!fs.existsSync("uploads")) {fs.mkdirSync("uploads");} //CREATE UPLOADS FOLDER IF NOT EXISTS

/* ---------------- ROUTES ---------------- */
app.use("/",authRoutes);
app.use("/products",productRoutes);
app.use("/shop",shopOwnerRoutes);
app.use("/admin",adminRoutes);
app.use("/categories",categoryRoutes);

/* ---------------- START SERVER ---------------- */
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});