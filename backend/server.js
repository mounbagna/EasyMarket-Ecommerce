import express from "express";
import cors from "cors";
import fs from "fs";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import shopOwnerRoutes from "./routes/shopOwnerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";

dotenv.config();

const app = express();


const allowedOrigins = [
  "http://localhost:3000",
  "https://easymarket-tau.vercel.app"
];


app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({
  extended:true,
  limit:"50mb"
}));


if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

app.use("/uploads", express.static("uploads"));


app.use("/", authRoutes);
app.use("/products", productRoutes);
app.use("/shop", shopOwnerRoutes);
app.use("/admin", adminRoutes);
app.use("/categories", categoryRoutes);
app.use("/feedback", feedbackRoutes);


app.listen(5000, () => {
  console.log("Server running on port 5000");
});