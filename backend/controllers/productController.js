import db from "../config/db.js";

/* GET ALL PRODUCTS */
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

/* GET SECOND PRODUCTS */
export const getSecondHandProducts = async(req, res) => {
  try {
    const sql = `SELECT * FROM products WHERE condition_type = 'second_hand'`

     db.query(sql, (err, results) => {
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
  } catch(error){
    res.status(500).json({error: error.message})
  }
  }

/* GET PRODUCTS OF ONE SHOP OWNER*/
export const getProductsByShopOwner = (req, res) => {
    const {id} = req.params;

  const sql = "SELECT * FROM products WHERE shopowner_id = ?";

  db.query(sql, [id], (err, results) => {
    if (err){
      console.error(err)
      return res.status(500).json(err);
    } 

    const products = results.map((product) => ({
      ...product, 
      thumbnail: JSON.parse(product.thumbnail || "[]"), 
      preview: JSON.parse(product.preview || "[]")
    }));
    res.json(products);
  }
  );
}

/* GET PRODUCTS BY CATEGORY */
export const getProductsByCategory = (req, res) => {
    const {id} = req.params;

  const sql = "SELECT products.*,categories.name AS category_name FROM products JOIN categories ON products.category_id=categories.id WHERE category_id = ?";

  db.query(sql, [id], (err, results) => {
    if (err){
      return res.status(500).json(err);
    } 

    const products = results.map((product) => ({
      ...product, 
      thumbnail: JSON.parse(product.thumbnail || "[]"), 
      preview: JSON.parse(product.preview || "[]")
    }));
    res.json(products);
  }
  );
}

/* ---------------- CREATE PRODUCT API ---------------- */
export const addProduct = (req, res) => {
    try {
      const shopowner_id = req.user.id;
      
      const {title, price,discountedPrice,quantity,description,category_id,location,condition_type} = req.body;
      
      const thumbnailFiles = req.files?.thumbnail || [];
      const previewFiles = req.files?.preview || [];
      
      const thumbnailUrls = thumbnailFiles.map((file) => `/uploads/${file.filename}`);
      const previewUrls = previewFiles.map((file) => `/uploads/${file.filename}`);
      
      const safeThumbnail = JSON.stringify(thumbnailUrls);
      const safePreview = JSON.stringify(previewUrls);
      console.log("body",req.body)
      const sql=`INSERT INTO products(title,price,discounted_price,quantity,description,thumbnail,preview,shopowner_id,category_id,location, condition_type)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(
      sql,
      [title,Number(price),Number(discountedPrice),Number(quantity),description,safeThumbnail,safePreview,shopowner_id,category_id,location,condition_type],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Database error" });
        }

        return res.status(201).json({
          message: "Product created successfully",
          id: result.insertId,
        });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({error: "server error"});
  }
  }

  /* ---------------- DELETE PRODUCT API ---------------- */
  export const deleteProduct = (req, res) => {
    try {
      const productId = req.params.id;
      const shopownerId = req.user.id;
      const sql = `DELETE FROM products WHERE id = ?`;

    db.query(
      sql,
      [productId,shopownerId],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Database error" });
        }
        if(result.affectedRows===0){
          return res.status(404).json({error:"Product not found"})
        }

        return res.status(201).json({
          message: "Product deleted successfully",
        });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({error: "server error"});
  }
  }

  /* ---------------- UPDATE PRODUCT API ---------------- */
export const updateProduct = async(req, res) => {
      const {id} = req.params;      
      const {title, price,discountedPrice,quantity,description,category_id,location,condition_type} = req.body;
      db.query("SELECT * FROM products WHERE id=?",[id],
        (err , rows)=>{
          if(err){console.log(err);
            return res.status(500).json({error:"db error"})
          }
          if(rows.length===0){
          return res.status(404).json({
            error:"Product not found"
          })
        }
      let thumbnail = rows[0].thumbnail;
      let preview = rows[0].preview;
      if(req.files?.thumbnail){
        thumbnail = JSON.stringify(
          req.files.thumbnail.map(file=>`/uploads/${file.filename}`)
        )
      }
      if(req.files?.preview){
        preview = JSON.stringify(
          req.files.preview.map(file=>`/uploads/${file.filename}`)
        )
      }
      const sql=`UPDATE products SET title=?,price=?,discounted_price=?,quantity=?,description=?,thumbnail=?,preview=?,category_id=?,location=?,condition_type=?
                 WHERE id=?`;
    db.query(
      sql,
      [title,Number(price),Number(discountedPrice),Number(quantity),description,thumbnail,preview,category_id,location,condition_type,id],
      (err, result)=>{
        if(err){console.log("update error",err);
            return res.status(500).json({error:"db error"})
          }
      if(result.affectedRows===0){
          return res.status(404).json({
            error:"Product not found"
          })
        }
        return res.status(200).json({
          message: "Product updated successfully",
        });
      } 
    );
    }
);    
  }

  //NEW ARRIVALS
  export const getNewArrivals = (req, res) => {
    
    const sql = `SELECT * FROM products ORDER BY created_at DESC LIMIT 3`;

  db.query(sql, (err, results) => {
    if (err){
      console.error(err)
      return res.status(500).json(err);
    } 
    const formatted = results.map((p) => {
      return {
      ...p, 
      thumbnail: JSON.parse(p.thumbnail || "[]"), 
      preview: JSON.parse(p.preview || "[]")
    }
  });
    res.json(formatted);
  }
  );
}

export const searchProducts = (req, res) => {
  const {q} = req.query;

  const sql = `
  SELECT p.*, c.name AS category_name, s.shop_name FROM products p LEFT JOIN categories c ON p.category_id = c.id 
  LEFT JOIN shopowners s ON p.shopowner_id = s.id WHERE p.title LIKE ? OR c.name LIKE ? OR s.shop_name LIKE ?
  OR p.location LIKE ?
  `;

  const search = `%${q}`;

  db.query(sql,[search,search,search,search],(err,results) => {
    if(err){
      return res.status(500).json(err);
    }
    res.json(results);
  })
}