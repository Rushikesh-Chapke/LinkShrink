const auth = require("./auth");
const shorten = require("./shorten");
const getShortenUrl = require("./get.shortenUrl");
const analytics = require("./analytics");

module.exports = async (router) => {
  router.post("/api/google-signin", auth.handler);
  router.post("/api/short", shorten.handler);
  router.get("/api/short/:url", getShortenUrl.handler);
  router.get("/api/:alias", analytics.handler);
};
