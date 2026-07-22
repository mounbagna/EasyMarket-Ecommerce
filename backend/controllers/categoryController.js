import db from "../config/db.js";

/* GET CATEGORIES */
export const getCategories = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM categories ORDER BY id");
    const categories = result.rows.map((category) => ({
        ...category,
        image:category.image,
    }));
    res.json(categories);
  } catch (err) {
    console.log("Get categories error:", err);
    res.status(500).json({message: "Database error"});
  }
}