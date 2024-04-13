let express = require('express');
const { login } = require('../controllers/authController.js');

let route = express.Router();

route.post('/login',login);


module.exports = route;
