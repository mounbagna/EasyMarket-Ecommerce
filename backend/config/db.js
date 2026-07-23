import pg from "pg";
import dotenv from "dotenv"

dotenv.config();

const { Pool } = pg;

const db = new Pool(
  process.env.DATABASE_URL ? {
    connectionString: process.env.DATABASE_URL,
    ssl:{
    rejectUnauthorized:false
  },
  } : {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.Db_PORT,
});

db.connect((err, client, release) => {
  if(err){
    console.log("Database connection failed", err.message);
  } else {
    console.log("Database connected");
    release();
  }
  
})

export default db;