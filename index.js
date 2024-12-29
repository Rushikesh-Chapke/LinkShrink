const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  post: process.env.DB_PORT,
});

pool
  .connect()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch(() => {
    console.log("Error occurred while connecting to database");
  });
function query(text, params, query_replica = false) {
  return query_replica
    ? replica_pool.query(text, params)
    : pool.query(text, params);
}



module.exports = {
  pool,
  query,
  
};
