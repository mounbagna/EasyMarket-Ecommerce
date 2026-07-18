import db from "../config/db.js";

/* GET CATEGORIES */
export const getCategories = (req, res) => {
    const sql = "SELECT * FROM categories";

    db.query(sql, (err, results) => {
    if (err){
      return res.status(500).json(err);
    } 

    const categories = results.map((category) => ({
        ...category,
        image:category.image,
    }));
    res.json(categories);
  });
}