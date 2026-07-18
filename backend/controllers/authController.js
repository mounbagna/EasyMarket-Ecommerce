import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendPaymentEmail from "../utils/sendPaymentEmail.js";
import dotenv from "dotenv";

dotenv.config();

/* ---------------- SHOP OWNER SIGN UP ---------------- */
export const register = async(req, res) => {
try {
  const {firstName,lastName,email,address,phone,shop_name,shop_category_id, password} = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
    
    //check if shopowner already exist
    db.query("SELECT * FROM shopowners WHERE email = ?", [email], async (err, result) =>{
      if (err) return res.status(500).json(err);

      if (result.length > 0) {
        return res.status(400).json({message: "Email already exist"})
      }
     
    const imageFiles = req.files?.image || [];
    const imageUrls = imageFiles.map((file) => `/uploads/${file.filename}`);
    const safeImage = JSON.stringify(imageUrls);
    const paymentDeadline = new Date(Date.now() + 24*60*60*1000);
    const sql = `INSERT INTO shopowners (firstname, lastname, email, address, phone, shop_name, shop_category_id, password,
                 image, status, registration_paid, payment_deadline) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql,
      [firstName,lastName,email,address,Number(phone),shop_name,shop_category_id,hashedPassword,safeImage,"pending",0,paymentDeadline],
      async(err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Database error" });
        }
        await sendPaymentEmail(
          email, firstName, paymentDeadline
        )
        return res.status(201).json({
          message: "Shop owner created successfully. Check your email for payment instructions.",
          id: result.insertId,
        });
      }
    );
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({error: "server error"});
  }}


/* ---------------- LOGIN ENDPOINT ---------------- */
export const login = (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
      return res.status(400).json({message: "Email and password are required"})
    }

    //1. Check Admin
    db.query(
    "SELECT * FROM admin WHERE email = ?", [email], async (err, adminResult) => {
      if (err) return res.status(500).json(err);

      if (adminResult.length > 0) {
        const admin = adminResult[0];
        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch) {
        return res.status(400).json({message: " Invalid password"})
      }
        const token = jwt.sign(
        {id: admin.id, email: admin.email},
        process.env.JWT_SECRET
      );

      return res.json({
        message: "Login successful",
        token,
        role:"admin",
        user: {id: admin.id, firstname: admin.firstname, lastname: admin.lastname, email: admin.email,
        },
      });
      }

      // 2. Continue with shop Owner...
      checkShopOwner();
    }
  );

  function checkShopOwner(){
    db.query(
    "SELECT * FROM shopowners WHERE email = ?", [email], async (err, shopResult) => {
      if (err) return res.status(500).json(err);

      if (shopResult.length > 0) {
        const shop = shopResult[0];
        const isMatch = await bcrypt.compare(password, shop.password);

        if(!isMatch) {
        return res.status(400).json({message: " Invalid password"});
      }

      if (shop.registration_paid == 0) {
        return res.status(403).json({message: " Please complete your registration payment"});
      }
        const token = jwt.sign(
        {id: shop.id, email: shop.email,role:"shopowner"},
        process.env.JWT_SECRET
      );

      return res.json({
        message: "Login successful",
        role: "shopowner",
        token,
        user: {id: shop.id, firstname: shop.firstname, lastname: shop.lastname, email: shop.email,shop_name:shop.shop_name
        },
      });
      }
      // 3. Continue with Customer
      checkCustomer();
    }
  );
}

function checkCustomer(){
    db.query(
    "SELECT * FROM customers WHERE email = ?", [email], async (err, customerResult) => {
      if (err) return res.status(500).json(err);

      if (customerResult.length == 0) {
        return res.status(400).json({message: " Invalid email"})
      }
        const customer = customerResult[0];
        const isMatch = await bcrypt.compare(password, customer.password);

        if(!isMatch) {
        return res.status(400).json({message: " Invalid password"});
      }
        const token = jwt.sign(
        {id: customer.id, email: customer.email,role:"customer"},
        process.env.JWT_SECRET
      );

      return res.json({
        message: "Login successful",
        role: "customer",
        token,
        user: {id: customer.id, firstname: customer.firstname, lastname: customer.lastname, email: customer.email
        }
      });
      }
  );
}
}