const express = require('express');
const router = express.Router();
const sequelize = require('../public/javascripts/sqlz.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const ms = require('ms')

const auth = require('../public/autz')

const privateKey = fs.readFileSync('./public/private.key','utf8')

router.route('/')
  .get((req, res) => {
    res.render('login', { title: 'Express' })
  })
  .post((req, res) => {
    let userId = req.body.usuario
    let password = req.body.hash
    if (userId !== '' && password !== '') {
      sequelize.query(`SELECT USUARIO, HASH, ISADMIN FROM USER where EMAIL='${userId}'`, {type: sequelize.QueryTypes.SELECT})
      .then( async resp => {     
        const code = req.body.hash;
        const hash = resp[0].HASH;
        const usu = resp[0].USUARIO;
        const isA = resp[0].ISADMIN;
        
        await bcrypt.compare(code, hash)
        .then( (result) => {
          if (result === true) {
            const token = jwt.sign({usu,isA}, privateKey, { expiresIn: ms('20m') /* , algorithm:  "RS256" */  } )
        
            res.cookie('jwtTok', token, { maxAge: ms('20m'), /* secure: true,*/ httpOnly: true  })
            res.cookie('adm', isA, { expires: new Date(Date.now() + ms('20m')), httpOnly: true})
            res.cookie('usu', usu, { expires: new Date(Date.now() + ms('20m')), httpOnly: true})
            res.redirect('login/bienvenido')

          } else error
        })
        .catch(error => {
          if (error) {
            res.status(404).send("contraseña no valida")
          }
        })
      })
      .catch(error => {
        if (error) {
          res.status(404).render('error', { title: 'Express' })
        }
      })
    } else {res.status(400).send('no data input')}
})

router.get('/bienvenido', auth, (req, res) => {
  const usr = req.cookies.usu
  res.render('bienvenida', { author: usr })
  //res.status(200).send(`Bienvenido a Delilah_Restor ${req.body.usuario}, por favor seleccione sus productos`)
})

router.get('/logout', (req, res) => {
  res.clearCookie('jwtTok')
  res.clearCookie('adm')
  res.redirect('/login')
})

module.exports = router;