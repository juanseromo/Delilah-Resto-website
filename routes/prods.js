const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const auth = require('../public/autz')

const sequelize = require('../public/javascripts/sqlz.js');

router.get('/', (req, res) => {
    res.sendStatus(200)
})
router.get('/admin', auth, (req, res) => {
    res.send('hello Admin')
})


router.get('/prod', (req, res) => {
    try{
      res.send('This is de prod you selected')
    } catch (e){
      if (e) {
        res.status(404).send("producto no encontrados")
      }
    }
  })


module.exports = exports = router