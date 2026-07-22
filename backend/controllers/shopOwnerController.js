import db from "../config/db.js";



/* GET SHOP OWNERS */

export const getShopOwners = async (req, res) => {

    try {

        const result = await db.query(
            `
            SELECT 
                s.id,
                s.shop_name,
                s.address,
                s.image,
                c.name AS category_name

            FROM shopowners s

            LEFT JOIN categories c 
            ON s.shop_category_id = c.id

            WHERE s.status = 'active'
            `
        );



        const formatted = result.rows.map((shop) => {

            let image = [];


            try {

                image = typeof shop.image === "string"
                    ? JSON.parse(shop.image)
                    : [];

            } catch {

                image = [];

            }



            return {

                id: shop.id,

                shop_name: shop.shop_name,

                address: shop.address,

                image,

                category_name: shop.category_name

            };

        });



        res.json(formatted);



    } catch(error) {

        console.error(error);

        res.status(500).json({
            error:"Database error"
        });

    }

};





/* GET ONE SHOP OWNER BY ID */

export const getShopOwnerById = async (req,res)=>{


    const {id}=req.params;


    try {


        const result = await db.query(

            `
            SELECT *
            FROM shopowners
            WHERE id=$1
            `,

            [id]

        );



        if(result.rows.length===0){

            return res.status(404).json({

                error:"Shop owner not found"

            });

        }



        res.json(result.rows[0]);



    }catch(error){


        console.error(error);


        res.status(500).json({

            error:"Database error"

        });


    }


};







/* GET LOGGED IN SHOP OWNER PROFILE */

export const getMyShop = async(req,res)=>{


    const id=req.user.id;



    try{


        const result = await db.query(

            `
            SELECT *
            FROM shopowners
            WHERE id=$1
            `,

            [id]

        );



        if(result.rows.length===0){

            return res.status(404).json({

                error:"Shop owner not found"

            });

        }



        res.json(result.rows[0]);



    }catch(error){


        console.error(error);


        res.status(500).json({

            error:"Database error"

        });


    }


};