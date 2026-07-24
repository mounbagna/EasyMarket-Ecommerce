import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../config/mail.js";

//ADMIN LOGIN
export const adminLogin = async (req,res) => {
    const {email,password} = req.body;

    try {
        const result = await  db.query("SELECT * FROM admin WHERE email = $1", [email]);
        if (result.rows.length === 0) {
                return res.status(401).json({message: "Invalid Credentials"});
            }
        
        const admin = result.rows[0];
            const valid = await bcrypt.compare(password,admin.password);
            if(!valid){
                return res.status(401).json({message:"Invalid Credentials"});
            }
            const token = jwt.sign(
                {
                    id: admin.id,
                    email: admin.email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn:"7d"
                }
            );
            res.json({
                token,
                admin: {
                    id: admin.id,
                    firstname: admin.firstname,
                    lastname: admin.lastname,
                },
            });
    }catch(err){
        console.error("Admin login error:", err);
        res.status(500).json({message: "server error"});
}
}

//GET PENDING SHOPS
export const getPendingShops = async (req,res) => {
    try {
        const result = await db.query(`SELECT * FROM shopowners WHERE status='pending' ORDER BY created_at DESC`);
        res.json(result.rows);
    } catch(error){
        console.log(error)
        res.status(500).json(error);
    }
}

//GET ACTIVE SHOPS
export const getActiveShops = async (req,res) => {
    try {
        const result = await db.query(`SELECT * FROM shopowners WHERE status='active' ORDER BY created_at DESC`);
        res.json(result.rows);
    } catch(error){
        console.log(error)
        res.status(500).json(error);
    }
}

//GET SUSPENDED SHOPS
export const getSuspendedShops = async (req,res) => {
     try {
        const result = await db.query("SELECT * FROM shopowners WHERE status='suspended' ORDER BY created_at DESC");
        res.json(result.rows);
    } catch(error){
        console.log(error)
        res.status(500).json(error);
    }
}

//GET REGISTERED CUSTOMERS
export const getCustomers = async (req,res) => {
    try {
        const result = await db.query("SELECT * FROM customers");
        res.json(result.rows);
    } catch(error){
        console.log(error)
        res.status(500).json(error);
    }
}

//GET ALL SHOP OWNERS 
export const getShopOwners = async (req,res) => {
    try {
        const result = await db.query("SELECT * FROM shopowners");
        res.json(result.rows);
    } catch(error){
        console.log(error)
        res.status(500).json(error);
    }
}

//GET ALL PRODUCTS 
export const getProducts = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM products"); 
        const formatted = result.rows.map((p) => {
      let preview = [];
      let thumbnail = [];

      try {
        thumbnail = JSON.parse(p.thumbnail || "[]");
      } catch (e) {
        thumbnail = [];
      }
       try {
        preview = JSON.parse(p.preview || "[]");
      } catch (e) {
        preview = [];
      }
      return {...p, thumbnail, preview};
    });
    res.json(formatted);
    } catch(error) {
        console.error(error)
        res.status(500).json(error);
    }
}

// SUSPEND A SHOP
export const suspendShopOwner = async (req, res) => {
    const {id} = req.params;

    try {
        await db.query("UPDATE shopowners SET status='suspended' WHERE id = $1",[id]);
        res.json({message:"Shop suspended successfully"});
    } catch(error){
        console.log(error)
        res.status(500).json(error);
    }
};

// REACTIVATE A SHOP
export const reactivateShopOwner = async (req, res) => {
    const {id} = req.params;

    try {
        await db.query("UPDATE shopowners SET status='active' WHERE id = $1",[id]);
        res.json({message:"Shop reactivated successfully"});
    } catch(error){
        console.log(error)
        res.status(500).json(error);
    }
};

// DELETE A SHOP
export const deleteShopOwner = async (req, res) => {
    const {id} = req.params;

    try {
        await db.query("DELETE FROM shopowners WHERE id = $1",[id]);
        res.json({message:"Shop deleted successfully"});
    } catch(error){
        console.log(error)
        res.status(500).json(error);
    }
};

// DELETE A PRODUCT
export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    try {
        await db.query("DELETE FROM products WHERE id = $1",[id]);
        res.json({message:"Product deleted successfully"});
    } catch(error){
        console.log(error)
        res.status(500).json(error);
    }
};

//GET DASHBOARD STATISTICS
export const getDashboardStats = async (req,res) => {
    const sql = `
    SELECT
    ( SELECT COUNT(*) FROM shopowners WHERE status='pending' ) AS pendingShops,
    ( SELECT COUNT(*) FROM shopowners WHERE status='active' ) AS activeShops,
    ( SELECT COUNT(*) FROM shopowners WHERE status='suspended' ) AS suspendedShops,
    ( SELECT COUNT(*) FROM products ) AS products,
    ( SELECT COUNT(*) FROM customers ) AS customers
    `;

    try {
        const result = await db.query(sql);
        res.json(result.rows[0]);
    } catch(error) {
        console.log(error)
        res.status(500).json(error);
    }
};


//ACTIVATE A SHOP OWNER'S ACCOUNT
export const activateShopOwner = async (req,res) => {
    const {id} = req.params;

    try {
        const updateResult = await db.query(`
            UPDATE shopowners 
            SET 
               status='active',
               registration_paid=true,
               monthly_paid_until = CURRENT_DATE + INTERVAL '30 days'
            WHERE id = $1
            RETURNING *
            `,[id]);
            
        if (updateResult.rows.length === 0) {return res.status(404).json({message: "Shopowner not found"});}   
        
        const owner = updateResult.rows[0];         
            
            //send Activation email
            await sendPaymentMail({
                from: process.env.EMAIL_USER,
                to: owner.email,
                subject: "EasyMarket shop activated",
                html: `
                    <h2>Hello ${owner.firstname}</h2>
                    <p>Your payment has been verified.</p>
                    <p>Your shop <b>${owner.shop_name}</b> is now active.</p>
                    <p>You can now login and manage your shop.</p>
                `
            },(error,info)=>{
                if(error){
                    console.log("email error",error);
                    return res.status(500).json({message:"shop activated but email failed"})
                }
                    console.log("activation email sent:",info.response);
                }
            );
            res.json({message:"shop activated successfully"});
        } catch(err) {
            console.error(err)
            res.status(500).json(err);
    }
}