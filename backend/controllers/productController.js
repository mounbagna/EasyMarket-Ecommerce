import db from "../config/db.js";
import cloudinary from "../config/cloudinary.js";

const formatProduct = (products) => {

    return products.map((p) => {

        let preview = [];
        let thumbnail = [];

        try {
            thumbnail = JSON.parse(p.thumbnail || "[]");
        } catch {
            thumbnail = [];
        }


        try {
            preview = JSON.parse(p.preview || "[]");
        } catch {
            preview = [];
        }


        return {
            ...p,
            thumbnail,
            preview
        };

    });

};

/* GET ALL PRODUCTS */
export const getProducts = async (req, res) => {

    try {

        const result = await db.query(
            "SELECT * FROM products"
        );


        res.json(
            formatProduct(result.rows)
        );


    } catch (error) {

        console.error(error);

        res.status(500).json({
            error:"Database error"
        });

    }

};

/* GET SECOND HAND PRODUCTS */
export const getSecondHandProducts = async (req, res) => {

    try {

        const result = await db.query(
            `
            SELECT * 
            FROM products 
            WHERE condition_type = 'second_hand'
            `
        );


        res.json(
            formatProduct(result.rows)
        );


    } catch(error){

        console.error(error);

        res.status(500).json({
            error:error.message
        });

    }

};


/* GET PRODUCTS OF ONE SHOP OWNER */
export const getProductsByShopOwner = async (req, res) => {

    const { id } = req.params;


    try {

        const result = await db.query(
            "SELECT * FROM products WHERE shopowner_id = $1",
            [id]
        );


        res.json(
            formatProduct(result.rows)
        );


    } catch(error){

        console.error(error);

        res.status(500).json({
            error:"Database error"
        });

    }

};

//* GET PRODUCTS BY CATEGORY */
export const getProductsByCategory = async (req, res) => {

    const { id } = req.params;


    try {

        const result = await db.query(
            `
            SELECT 
                products.*,
                categories.name AS category_name

            FROM products

            JOIN categories 
            ON products.category_id = categories.id

            WHERE products.category_id = $1
            `,
            [id]
        );


        res.json(
            formatProduct(result.rows)
        );


    } catch(error){

        console.error(error);

        res.status(500).json({
            error:"Database error"
        });

    }

};
/* ---------------- CREATE PRODUCT API ---------------- */

export const addProduct = async (req, res) => {
    try {
        const shopowner_id = req.user.id;
        const {title,price,discountedPrice,quantity,description,category_id,location,condition_type} = req.body;

        const thumbnailFiles = req.files?.thumbnail || [];
        const previewFiles = req.files?.preview || [];

        const thumbnailUrls = [];
        for (const file of thumbnailFiles) {
            const result = await cloudinary.uploader.upload(file.path,{folder: "easymarket/products"});
            thumbnailUrls.push(result.secure_url);
        } 

        const previewUrls = [];
        for (const file of previewFiles) {
            const result = await cloudinary.uploader.upload(file.path,{folder: "easymarket/products"});
            previewUrls.push(result.secure_url);
        } 

        const safeThumbnail = JSON.stringify(thumbnailUrls);
        const safePreview = JSON.stringify(previewUrls);

        const result = await db.query(`INSERT INTO products
            (
            title,price,discounted_price,quantity,description,thumbnail,preview,shopowner_id,category_id,location,condition_type
            )
            VALUES
            (
                $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11
            )
            RETURNING id
            `,
            [
                title,Number(price),Number(discountedPrice),Number(quantity),description,safeThumbnail,safePreview,shopowner_id,category_id,location,condition_type
            ]
        );
        res.status(201).json({message:"Product created successfully",id: result.rows[0].id});
    } catch(error){
        console.error(error);
        res.status(500).json({error:"Server error"});
    }
};

/* ---------------- DELETE PRODUCT API ---------------- */

export const deleteProduct = async (req,res)=>{

    try{

        const {id} = req.params;


        const result = await db.query(

            `
            DELETE FROM products
            WHERE id=$1
            RETURNING id
            `,

            [id]

        );


        if(result.rows.length===0){

            return res.status(404).json({
                error:"Product not found"
            });

        }


        res.json({

            message:"Product deleted successfully"

        });



    }catch(error){

        console.error(error);

        res.status(500).json({
            error:"Server error"
        });

    }

};

  /* ---------------- UPDATE PRODUCT API ---------------- */

export const updateProduct = async(req,res)=>{
    try{
        const {id}=req.params;
        const {title,price,discountedPrice,quantity,description,category_id,location,condition_type}=req.body;
        const oldProduct = await db.query("SELECT * FROM products WHERE id=$1",[id]);

        if(oldProduct.rows.length===0){return res.status(404).json({error:"Product not found"});}

        let thumbnail = oldProduct.rows[0].thumbnail;
        let preview = oldProduct.rows[0].preview;

        if(req.files?.thumbnail){
            thumbnailUrls = [];
            for (const file of req.files.thumbnail) {
                const result = await cloudinary.uploader.upload(file.path, {folder: "easymarket/products"});
                thumbnailUrls.push(result.secure_url);
            }
            thumbnail = JSON.stringify(thumbnailUrls);
        }

        if(req.files?.preview){
            previewUrls = [];
            for (const file of req.files.preview) {
                const result = await cloudinary.uploader.upload(file.path, {folder: "easymarket/products"});
                previewUrls.push(result.secure_url);
            }
            preview = JSON.stringify(previewUrls);
        }
        
        if(req.files?.preview){
            preview = JSON.stringify(req.files.preview.map(file=>`/uploads/${file.filename}`));
        }
        const result = await db.query(`UPDATE products
            SET title=$1,price=$2,discounted_price=$3,quantity=$4,description=$5,thumbnail=$6,preview=$7,category_id=$8,location=$9,condition_type=$10
            WHERE id=$11
            RETURNING id
            `,
            [
                title,Number(price),Number(discountedPrice),Number(quantity),description,thumbnail,preview,category_id,location,condition_type,id
            ]
        );
        res.json({message:"Product updated successfully",id:result.rows[0].id});
    }catch(error){
        console.error(error);
        res.status(500).json({error:"Server error"});
    }
};

  // NEW ARRIVALS

export const getNewArrivals = async(req,res)=>{


    try{


        const result = await db.query(

            `
            SELECT *
            FROM products
            ORDER BY created_at DESC
            LIMIT 3
            `

        );


        res.json(
            formatProduct(result.rows)
        );



    }catch(error){

        console.error(error);

        res.status(500).json({
            error:"Database error"
        });

    }

};

//SEARCH PRODUCTS
export const searchProducts = async(req,res)=>{


    try{


        const {q}=req.query;


        const search=`%${q}%`;



        const result = await db.query(

            `
            SELECT 
                p.*,
                c.name AS category_name,
                s.shop_name

            FROM products p


            LEFT JOIN categories c

            ON p.category_id=c.id


            LEFT JOIN shopowners s

            ON p.shopowner_id=s.id


            WHERE 
            p.title ILIKE $1

            OR c.name ILIKE $1

            OR s.shop_name ILIKE $1

            OR p.location ILIKE $1

            `,

            [search]

        );



        res.json(
            formatProduct(result.rows)
        );



    }catch(error){

        console.error(error);

        res.status(500).json({
            error:"Database error"
        });

    }

};