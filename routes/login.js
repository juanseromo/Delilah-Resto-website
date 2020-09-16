const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const cookieParser = require('cookie-parser');

const auth = require('../public/autz')

const publicKey = fs.readFileSync('./public/public.key','utf8')
const privateKey = fs.readFileSync('./public/private.key','utf8')

const sequelize = new Sequelize('mariadb://root:juanseromo1208@localhost:3306/delilah-db', {
  dialect: 'mariadb',
  dialectOptions: {useUTC: false,
    timezone: process.env.db_timezone
  },
  define: {
    timestamps: false // true by default
  }
})

router.route('/')
  .get((req, res) => {
    res.render('login', { title: 'Express' })
  })
  .post((req, res) => {
    let userId = req.body.usuario
    sequelize.query(`SELECT USUARIO, HASH, ISADMIN FROM USER where EMAIL='${userId}'`, {type: sequelize.QueryTypes.SELECT})
    .then( async resp => {     
      const code = req.body.hash;
      const hash = resp[0].HASH;
      const usu = resp[0].USUARIO;
      const isA = resp[0].ISADMIN;
      
      await bcrypt.compare(code, hash)
      .then( (result) => {
        if (result === true) {
          const token = jwt.sign({usu,isA}, privateKey, { expiresIn: '10' /* , algorithm:  "RS256" */  } )
      
          res.cookie('jwtTok', token/* , { maxAge: 10, secure: true, httpOnly: true } */)
          res.cookie('adm', isA/* , { expiresIn: '10', secure: true} */)
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
        res.status(404).send("usuario no encontrado")
      }
    })
  })  


router.get('/bienvenido', auth, (req, res) => {
  res.render('bienvenida', { title: 'Express' })
  //console.log(`hola ${req.usuario[0]}`)
  //res.status(200).send(`Bienvenido a Delilah_Restor ${req.body.usuario}, por favor seleccione sus productos`)
})

router.get('/logout', (req, res) => {
  res.clearCookie('jwtTok')
  res.clearCookie('adm')
  res.redirect('/login')
})

module.exports = router;