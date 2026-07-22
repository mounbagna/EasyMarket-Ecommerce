import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendPaymentEmail from "../utils/sendPaymentEmail.js";
import dotenv from "dotenv";

dotenv.config();

/* ---------------- SHOP OWNER SIGN UP ---------------- */
export const register = async (req, res) => {
try {
  const {firstName,lastName,email,address,phone,shop_name,shop_category_id, password} = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  //check if shopowner already exist
  const existingOwner = await db.query("SELECT * FROM shopowners WHERE email = $1", [email]);
  if (existingOwner.rows.length > 0) {return res.status(400).json({message: "Email already exist"})}

  const imageFiles = req.files?.image || [];
  const imageUrls = imageFiles.map((file) => `/uploads/${file.filename}`);
  const safeImage = JSON.stringify(imageUrls);

  const paymentDeadline = new Date(Date.now() + 24*60*60*1000);
  const result = await db.query(
    `
    INSERT INTO shopowners 
    (
    firstname,lastname,email,address,phone,shop_name,shop_category_id,password,image,status,registration_paid,payment_deadline
    ) 
    VALUES 
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    RETURNING id
    `,[
      firstName,lastName,email,address,Number(phone),shop_name,shop_category_id,hashedPassword,safeImage,"pending",false,paymentDeadline
    ]);
    
    await sendPaymentEmail(email, firstName, paymentDeadline);
        return res.status(201).json({
          id: result.rows[0].id,
          message: "Shop owner created successfully. Check your email for payment instructions.",
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({error: "server error"});
    }
  } 


/* ---------------- LOGIN ENDPOINT ---------------- */
export const login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
      return res.status(400).json({message: "Email and password are required"})
    }

    try {
       //1. CHECK ADMIN
      const adminResult = await db.query("SELECT * FROM admin WHERE email = $1", [email]);

      if (adminResult.rows.length > 0) {
        const admin = adminResult.rows[0];
        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch) {
        return res.status(400).json({message: " Invalid password"})
      }
        const token = jwt.sign(
        {id: admin.id, email: admin.email, role:"admin"},
        process.env.JWT_SECRET,{expiresIn: "7d"}
      );

      return res.json({
        message: "Login successful",
        token,
        role:"admin",
        user: {id: admin.id, firstname: admin.firstname, lastname: admin.lastname, email: admin.email,
        }
      });
      }

      //2. CHECK SHOP OWNER
      const shopResult = await db.query("SELECT * FROM shopowners WHERE email = $1", [email]);

       if (shopResult.rows.length > 0) {
        const shop = shopResult.rows[0];
        const isMatch = await bcrypt.compare(password, shop.password);

        if(!isMatch) {
        return res.status(400).json({message: " Invalid password"});
      }

      if (!shop.registration_paid) {
        return res.status(403).json({message: " Please complete your registration payment"});
      }
        const token = jwt.sign(
        {id: shop.id, email: shop.email,role:"shopowner"},
        process.env.JWT_SECRET,{expiresIn:"7d"}
      );

      return res.json({
        message: "Login successful",
        role: "shopowner",
        token,
        user: {id: shop.id, firstname: shop.firstname, lastname: shop.lastname, email: shop.email,shop_name:shop.shop_name
        }
      });
      }

      //3. CHECK CUSTOMER
      const customerResult = await db.query("SELECT * FROM customers WHERE email = 1$", [email]);
      if (customerResult.rows.length > 0) {
        const customer = customerResult.rows[0];
        const isMatch = await bcrypt.compare(password, customer.password);

        if(!isMatch) {
        return res.status(400).json({message: " Invalid password"});
      }
      const token = jwt.sign(
        {id: customer.id, email: customer.email,role:"customer"},
        process.env.JWT_SECRET,{expiresIn:"7d"}
      );
      return res.json({
        message: "Login successful",
        role: "customer",
        token,
        user: {id: customer.id, firstname: customer.firstname, lastname: customer.lastname, email: customer.email
        }
      });
    }

    return res.status(400).json({message: "Invalid email or password"});
} catch (error) {
  console.error("Login error:", error);
  res.status(500).json({message: "server error"});
}
}