const express = require("express");
const {pool, query} = require('../../index')
const router = express.Router();
const jwt = require("jsonwebtoken");

async function logic(req, res) {
  let user = req.body;
  let { google_id, name, email } = req?.body;
  try {
    let { rows } = await pool.query(
      "INSERT INTO users (google_id, name, email) VALUES ($1, $2, $3) RETURNING *",
      [google_id, name, email]
    );
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "300s",
    });
    
   
    return { user: rows[0] ,token};
  } catch (err) {
    throw err;
  }
}
function handler(req, res) {
  logic(req, res)
    .then((data) => {
      res.status(200).send({ status: true, message: {data } });
    })
    .catch((error) => {
      res.status(400).send({ status: false, message: `${error}` });
    });
}
module.exports = {
  handler,
};
