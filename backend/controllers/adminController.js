import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../config/mail.js";

//ADMIN LOGIN
export const adminLogin = (req,res) => {
    const {email,password} = req.body;

    db.query(
        "SELECT * FROM admin WHERE email = ?", [email], async (err, result) =>{
            if (err) return res.status(500).json(err);
            if (result.length === 0) {
                return res.status(401).json({message: "Invalid Credentials"});
            }

            const admin = result[0];
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
        }
    )
}

//GET PENDING SHOPS
export const getPendingShops = (req,res) => {
    const sql = `SELECT * FROM shopowners WHERE status='pending' ORDER BY created_at DESC`;

    db.query(sql,(err,result)=>{
        if(err){
            return res.status(500).json(err);
        }
        res.json(result);
    })
}

//GET ACTIVE SHOPS
export const getActiveShops = (req,res) => {
    const sql = `SELECT * FROM shopowners WHERE status='active' ORDER BY created_at DESC`;

    db.query(sql,(err,result)=>{
        if(err){
            return res.status(500).json(err);
        }
        res.json(result);
    })
}

//GET SUSPENDED SHOPS
export const getSuspendedShops = (req,res) => {
    const sql = `SELECT * FROM shopowners WHERE status='suspended' ORDER BY created_at DESC`;

    db.query(sql,(err,result)=>{
        if(err){
            return res.status(500).json(err);
        }
        res.json(result);
    })
}

//GET REGISTERED CUSTOMERS
export const getCustomers = (req,res) => {
    const sql = `SELECT * FROM customers`;

    db.query(sql,(err,result)=>{
        if(err){
            return res.status(500).json(err);
        }
        res.json(result);
    })
}

//GET ALL SHOP OWNERS 
export const getShopOwners = (req,res) => {
    const sql = `SELECT * FROM shopowners`;

    db.query(sql,(err,result)=>{
        if(err){
            return res.status(500).json(err);
        }
        res.json(result);
    })
}

//GET ALL PRODUCTS 
export const getProducts = (req, res) => {
    db.query("SELECT * FROM products", (err, results) => {
    if (err){
      console.error(err)
      return res.status(500).json(err);
    } 

    const formatted = results.map((p) => {
      let preview = [];
      let thumbnail = null;

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
  });
}

// SUSPEND A SHOP
export const suspendShopOwner = (req, res) => {
    const {id} = req.params;

    const sql = `UPDATE shopowners SET status='suspended' WHERE id = ?`;

    db.query(sql,[id],(err, result) => {
        if(err){
            return res.status(500).json(err)
        }
 
        res.json({message:"Shop suspended successfully"});
    });
};

// REACTIVATE A SHOP
export const reactivateShopOwner = (req, res) => {
    const {id} = req.params;

    const sql = `UPDATE shopowners SET status='active' WHERE id = ?`;

    db.query(sql,[id],(err, result) => {
        if(err){
            return res.status(500).json(err)
        }
 
        res.json({message:"Shop reactivated successfully"});
    });
};

// DELETE A SHOP
export const deleteShopOwner = (req, res) => {
    const {id} = req.params;

    const sql = `DELETE FROM shopowners WHERE id = ?`;

    db.query(sql,[id],(err, result) => {
        if(err){
            return res.status(500).json(err)
        }
 
        res.json({message:"Shop deleted successfully"});
    });
};

// DELETE A PRODUCT
export const deleteProduct = (req, res) => {
    const {id} = req.params;

    const sql = `DELETE FROM products WHERE id = ?`;

    db.query(sql,[id],(err, result) => {
        if(err){
            return res.status(500).json(err)
        }
 
        res.json({message:"Shop deleted successfully"});
    });
};

//GET DASHBOARD STATISTICS
export const getDashboardStats = (req,res) => {
    const sql = `
    SELECT
    ( SELECT COUNT(*) FROM shopowners WHERE status='pending' ) AS pendingShops,
    ( SELECT COUNT(*) FROM shopowners WHERE status='active' ) AS activeShops,
    ( SELECT COUNT(*) FROM shopowners WHERE status='suspended' ) AS suspendedShops,
    ( SELECT COUNT(*) FROM products ) AS products,
    ( SELECT COUNT(*) FROM customers ) AS customers
    `;

    db.query(sql,(err,result) => {
        if(err){
            console.log(err);
            return res.status(500).json({message: "Database error"});
        }
        res.json(result[0]);
    });
};


//ACTIVATE A SHOP OWNER'S ACCOUNT
export const activateShopOwner = (req,res) => {
    const {id} = req.params;

    const sql = `
    UPDATE shopowners SET status='active',registration_paid=1,monthly_paid_until=DATE_ADD(CURDATE(), INTERVAL 30 DAY) WHERE id=?`;

    db.query(sql,[id],(err, result) =>{

            if (err) return res.status(500).json(err);
            if (result.affectedRows === 0) {
                return res.status(404).json({message: "Shopowner not found"});
            }   
            
            //get owner email
            db.query("SELECT * FROM shopowners WHERE id=?",[id],(err, owners) =>{
            if (err) return res.status(500).json(err);
            
            const owner=owners[0]

            //send email
            transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: owner.email,
                subject: "EasyMarket shop activated",
                
                html:
        `
        <h2>Hello ${owner.firstname}</h2>
        <p>Your payment has been verified.</p>
        <p>Your shop <b>${owner.shop_name}</b> is now active.</p>
        <p>You can now login and manage your shop.</p>
        `
            },(error,info)=>{
                if(error){
                    console.log("email error",error);
                    return res.status(500).json({message:"shop activated but email failed"})
                }else{
                    console.log("activation email sent:",info.response)
                }
            });
                });   
        })
}