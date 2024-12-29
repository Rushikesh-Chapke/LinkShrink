const express = require("express");
const { pool } = require("../../index");
const nanoid = require("nanoid");
const id = nanoid();

async function logic(req, res) {
  try {
    
     const {url} = req?.params
    const result = await pool.query( "SELECT * FROM urls WHERE short_url = $1", [url] );
    if (result.rows.length === 0) {
        return ('Short URL not found');
      }
  
      const urls = result.rows[0];
       res.redirect(urls.long_url);
     return 'success redirected successfully'
  } catch (err) {
    throw error;
  }
}

function handler(req, res) {
  logic(req, res)
    .then((data) => {
    //   res.status(200).send({ status: true, message: { data } });
    })
    .catch((error) => {
      res.status(400).send({ status: false, message: `${error}` });
    });
}
module.exports = {
  handler,
};
