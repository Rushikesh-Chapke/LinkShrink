const router = require('express').Router();

require('../controllers')(router);

module.exports = (app) =>{
    app.use(``,router)
}