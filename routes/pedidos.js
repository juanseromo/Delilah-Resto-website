const express = require('express');
const router = express.Router();
const auth = require('../public/autz')
const sequelize = require('../public/javascripts/sqlz.js')
const ms = require('ms')

router.get('/', auth, (req, res) => {
  try{
    sequelize.query(
      `SELECT * FROM PEDIDOS`, { type: sequelize.QueryTypes.SELECT}
      //`SELECT PRECIO FROM PRODUCTOS WHERE DESCRIPCION='panelas'`, { type: sequelize.QueryTypes.SELECT},
    ).then((resp) => {
      const form='<form id="register" action="/pedidos/admin" method="post"> <label for="estados">Seleccione un estado</label> <select name="estados" id="estados"> <option value="nuevo">Nuevo</option> <option value="confirmado"> Confirmado </option> <option value="preparando">Preparando</option> <option value="enviando">Enviando</option> <option value="cancelado">Cancelado</option> <option value="entregado">Entregado</option> </select> <button class="botón" type="submit">Cambiar estado</button> </form>'
      let array = []
      resp.forEach(item => {
        array.push( form + item.ESTADO + '= ' + item.USUARIO  + ': ' + item.ID_PROD + '</br>')
      })
      res.status(200).send('<h1> Lista de pedidos <br></h1>' + array.join(''))
    }).catch(error => {
      if (error) {
        res.status(404).send("productos no encontrados")
      }
    })
  } catch (e){console.error(e)}
})
router.route('/admin')
  .post( (req, res) => {
    console.log(req.body)
    sequelize.query(
      `INSERT INTO PEDIDOS (ESTADO) VALUES ('${req.body.ESTADO}')`
    )
    .then((resp) =>{
      console.log(resp)
      res.redirect('/pedidos')
    })
    .catch(error => {
      if (error) {
        console.log(error)
        res.status(404).send(error)
      }
    })
  })
router.route('/nuevo')
  .get(auth, (req, res) => {
    const usr = req.cookies.usu
    res.render('details', { author: usr })
  })
  .post( (req, res) => {
    const usDet = req.body
    res.cookie('usDet', usDet, { maxAge: ms('30m')/* , secure: true, httpOnly: true  */ })
    res.redirect('../pedidos/nuevo/productos')
  })
router.route('/nuevo/productos')
  .get( auth, (req, res) => {
    sequelize.query(
      `SELECT * FROM PRODUCTOS`, { type: sequelize.QueryTypes.SELECT}
    ).then((resp) => {
      let array = []
      
      const usr = req.cookies.usu
      
      resp.forEach(item => {
        array.push(`<li class="check"><div class="price"><input id='${item.DESCRIPCION}' type="checkbox" name='${item.DESCRIPCION}'><label for='${item.DESCRIPCION}'>${item.DESCRIPCION}</label></div> <div class="price">${item.PRECIO}</div> </li>`)
        array.join("")
      })
      res.render('carrito', { author: usr, prods: array })
    }).catch(error => {
      if (error) {
        res.status(404).send( JSON.stringify(error))
      }
    })
  })
  .post( auth, (req, res) => {
    const usu = req.cookies.usu
    const payload = req.body;
    const now = new Date(Date.now()).toString()
    const prods = Object.keys(payload)
    const usDet = req.cookies.usDet
    console.log( usDet, prods )

    let id_prod = [
      //Array with Selected products
    ]

    const direccion = usDet.dir

    sequelize.query(
      `INSERT INTO PEDIDOS VALUES ( '1', '${now}', NULL, '${prods}', 'precio', '${usu}', '${direccion}')`
    )
    .then((resp) =>{
      res.render('pocreado', { prods: prods, usDet: usDet, author: usu })
    })
    .catch(error => {
      if (error) {
        console.log(error)
        res.status(404).send(error)
      }
    })
})



module.exports = exports = router
