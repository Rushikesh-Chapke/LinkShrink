const express = require("express");
const { pool } = require("../../index");
const nanoid = require("nanoid");
const id = nanoid();

async function logic(req, res) {
  try {
    const { longUrl, customAlias, topic, userId } = req.body;

    const shortUrl = nanoid(6);
    const result = await pool.query(
      "INSERT INTO urls (long_url, short_url, custom_alias, topic, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [longUrl, shortUrl, customAlias, topic, userId]
    );

    const userAgent = req.headers["user-agent"];
    const ipAddress = req.ip;
    await pool.query(
      "INSERT INTO analytics (url_id, user_agent, ip_address, os_name, device_type) VALUES ($1, $2, $3, $4, $5)",
      [longUrl, userAgent, ipAddress, "OS_UNKNOWN", "DEVICE_UNKNOWN"]
    );

    return result.rows[0];
  } catch (err) {
    throw err;
  }
}

function handler(req, res) {
  logic(req, res)
    .then((data) => {
      res.status(200).send({ status: true, message: { data } });
    })
    .catch((error) => {
      res.status(400).send({ status: false, message: `${error}` });
    });
}
module.exports = {
  handler,
};
