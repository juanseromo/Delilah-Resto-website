const express = require('express');
const router = express.Router();
const sequelize = require('../public/javascripts/sqlz.js');
const bcrypt = require('bcrypt');
const auth = require('../public/autz')

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});  

router.route('/registro')
  .get((req, res) => {
    res.render('register', { title: 'Express' });
  })

router.post('/registrar/nvo-user', async(req, res) => {
    try {
      const log = req.body;
      const hash = await bcrypt.hash(`${log.password}`, 10)
        sequelize.query(
        `INSERT INTO USER VALUES ( NULL , '${log.username}', '${log.email}', '${hash}', '${log.nombre}', '${log.telefono}', 'admin')`
      ).then((resp) => {
        res.status(200).send('Usuario Registrado correctamente')
      }).catch(function(err) {
        // print the error details
        res.status(409).send(`el email '${req.body.email}' ya se encuentra registrado`);
      })
    } catch(e){console.error(e)}
  })

module.exports = router;
