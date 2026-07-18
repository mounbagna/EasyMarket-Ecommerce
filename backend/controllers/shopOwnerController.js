import db from "../config/db.js";

/* GET SHOPOWNERS */
export const getShopOwners = (req, res) => {
    const sql = `SELECT s.id, s.shop_name,s.address,s.image,c.name AS category_name FROM shopowners s
     LEFT JOIN categories c ON s.shop_category_id = c.id WHERE s.status = 'active'`;

    db.query(sql, (err, results) => {
    if (err){
      console.error(err)
      return res.status(500).json(err);
    } 

    const formatted = results.map((p) => {
      let image = [];

      try {
        image = typeof p.image === "string" ? JSON.parse(p.image) : [];
      } catch (e) {
        image = [];
      }
      return {
        id:p.id,
        shop_name:p.shop_name,
        address:p.address,
        image,
        category_name:p.category_name
      };
    });

    res.json(formatted);
  });
}

/* GET ONE SHOP OWNER BY ID */
export const getShopOwnerById = (req, res) => {
  const id = req.params.id;
    const sql = `SELECT * FROM shopowners WHERE id = ?`;

    db.query(sql,[id], (err, result) => {
    if (err){
      console.error(err)
      return res.status(500).json(err);
    } 

    if(result.length === 0){
        return res.status(404).json({
            error: "Shop owner not found"
        });
    }

    res.json(result[0]);
  });
}

/* GET LOGGED IN SHOP OWNER PROFILE */
export const getMyShop = (req, res) => {
    const id = req.user.id;

    const sql = `SELECT * FROM shopowners WHERE id = ?`;

    db.query(sql,[id],(err, result) => {
        if(err){
            return res.status(500).json(err)
        }
 
        res.json(result[0]);
    });
};

