import mysql from 'mysql2'
import dotenv from 'dotenv'

//Used to grab data from the .env file
dotenv.config()

//connent to the DB
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()



//GETTING-----------------------------------------------------------------------------
export async function getGas() {
    const [rows] = await pool.query("SELECT * FROM gas")
    return rows
}

export async function getGasStop(id){
    const [rows] = await pool.query(`
    SELECT *
    FROM gas
    WHERE id = ?
    `,[id])
    return rows[0]
}



//POSTING-----------------------------------------------------------------------------



//GAS====
export async function postGas(station, cost_per_gal, total_gal){
    const [result] = await pool.query(`
     INSERT INTO gas (station, cost_per_gal, total_gal)
     VALUES (?, ?, ?)   
    `, [station, cost_per_gal, total_gal])
    const id = result.insertId
    return getGas()
}




const res= await postGas('test', 2.2, 3)
console.log(res)