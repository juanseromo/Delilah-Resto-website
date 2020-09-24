const express = require('express');
const router = express.Router();
const auth = require('../public/autz')
const sequelize = require('../public/javascripts/sqlz.js')
const ms = require('ms')

router.get('/', (req, res) => {
  res.redirect('/pedidos/admin')
})

router.route('/admin')
//VISUALIZAR TODOS LOS PEDIDOS
  .get( auth, (req, res) => {
    sequelize.query(
      `SELECT * FROM PEDIDOS`, { type: sequelize.QueryTypes.SELECT}
      //`SELECT PRECIO FROM PRODUCTOS WHERE DESCRIPCION='panelas'`, { type: sequelize.QueryTypes.SELECT},
    ).then( (resp) => {
      const usu = req.cookies.usu
      console.log(usu, resp)
      let array = []

      
      resp.forEach( item => {
        //const oncl = require('../public/javascripts/pos')
        let id_po = `<p class="par">${item.ID_PO}</p>`
        //get the nearest or closest tag element with the ID_PO, take and save the value on the cookie, which will be then requested to update the specific PO.
        const form = `<form action="/pedidos/admin" method="post" > <label for="estados">Nuevo Estado</label> <select name="estados" id="estados"> <option value="nuevo">Nuevo</option> <option value="confirmado"> Confirmado </option> <option value="preparando">Preparando</option> <option value="enviando">Enviando</option> <option value="cancelado">Cancelado</option> <option value="entregado">Entregado</option> </select> <button class="stat" type="submit" onclick="oncl(${item.ID_PO})">Cambiar estado</button> </form>`
        array.push( '<div class="contBody">' + form + id_po + `<p class="par">${item.ESTADO}</p>` + `<p class="par">${item.USUARIO}</p>` + `<p class="par">${item.ID_PROD}</p>` + '</div>')
      })

      res.render('pedidos', { contBody: array, author: usu })
      
    }).catch(error => {
      if (error) {
        res.status(404).send(JSON.stringify(error))
      }
    })
  })

  //ACTUALIZAR EL ESTADO DE LOS PEDIDOS
  .post(async (req, res) => {
    //console.log(req.body)
    sequelize.query(
      'UPDATE PEDIDOS SET ESTADO=:estado WHERE ID_PO=:id_po', {replacements: {estado:`${req.body.estados}`, id_po:`${req.cookies.stat}` }} 
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
//COMENZAR A AGREGAR LOS DETALLES DEL USUARIO QUE REALIZA EL NUEVO PEDIDO
router.route('/nuevo')
  .get(auth, (req, res) => {
    const usr = req.cookies.usu
    res.render('details', { author: usr })
  })
  //GUARDAR UN COOKIE CON DETALLES DEL USUARIO QUE ESTÁ CREANDO EL PEDIDO
  .post( (req, res) => {
    const usDet = req.body
    res.cookie('usDet', usDet, { maxAge: ms('30m')/* , secure: true, httpOnly: true  */ })
    res.redirect('../pedidos/nuevo/productos')
  })

router.route('/nuevo/productos')
//LISTA DE TODOS LOS PRODUCTOS DISPONIBLES EN LA BASE DE DATOS
//Y ENVÍA FORMULARIO CON INFORMACIÓN DE LOS PRODUCTOS SELECCIONADOS 
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
  //SE AGREGA EL NUEVO PO A LA BASE DE DATOS
  .post( auth, (req, res) => {
    const usu = req.cookies.usu
    const payload = req.body;
    const now = new Date(Date.now()).toString()
    const prods = Object.keys(payload)
    const usDet = req.cookies.usDet
    const direccion = usDet.dir
    sequelize.query(
      `INSERT INTO PEDIDOS VALUES ( 'Nuevo', '${now}', NULL, '${prods}', 'precio', '${usu}', '${direccion}')`
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