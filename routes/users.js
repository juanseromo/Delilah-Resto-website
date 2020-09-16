const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const autenticarUsuario = require('../public/autz')

const sequelize = require('../public/javascripts/sqlz.js');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});




module.exports = router

