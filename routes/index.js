const express = require('express');
const router = express.Router();
const sequelize = require('../public/javascripts/sqlz.js');
const bcrypt = require('bcrypt');
const auth = require('../public/autz')

//PAGINA DE INICIO
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});  
//PAGINA DE REGISTRO
router.route('/registro')
  .get((req, res) => {
    res.render('register', { title: 'Express' });
  })
//REGISTRAR UN NUEVO USUARIO
  .post( async(req, res) => {
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
  })

module.exports = router;
