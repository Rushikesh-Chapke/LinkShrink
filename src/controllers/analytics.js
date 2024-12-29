const { pool } = require("../../index");
async function logic(req, res) {
  try {
    let { alias } = req?.params;
    const url = await pool.query("SELECT * FROM urls WHERE short_url = $1", [
      alias,
    ]);
    if (url.rows.length === 0) throw "short does not exists";
    const analytics = await pool.query(
      "SELECT COUNT(*) AS total_clicks, COUNT(DISTINCT ip_address) AS unique_users FROM analytics WHERE url_id = $1",
      [url.rows[0].long_url]
    );
    const aboutDevice = await pool.query(
        "SELECT * FROM analytics WHERE url_id = $1",
        [url.rows[0].long_url]
      );
    return  {analyticsReport : analytics.rows[0] ,aboutUser: aboutDevice?.rows }  ;
  } catch (error) {
    throw error;
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
