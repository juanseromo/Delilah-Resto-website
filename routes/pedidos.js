const express = require('express');
const router = express.Router();
const auth = require('../public/autz')
const sequelize = require('../public/javascripts/sqlz.js')
const ms = require('ms')

//tomar el usuario desde el cache para identificarlo, 
//este nombre será guardado en la lista de pedidos, junto al nuevo # de PO, 
//precio total del po, descripción de todos los productos del mismo PO.

//user requests the Product details, add them to a personal purchasing cart, 
//an endpoint which returns the status for both, purchase orders and products.

router.get('/', auth, (req, res) => {
    try{
        sequelize.query(
          `SELECT * FROM PEDIDOS`, { type: sequelize.QueryTypes.SELECT}
          //`SELECT PRECIO FROM PRODUCTOS WHERE DESCRIPCION='panelas'`, { type: sequelize.QueryTypes.SELECT},
        ).then((resp) => {
          console.log(resp)
          let array = []
          resp.forEach(item => {
            array.push(item.HORA_FECHA + ': ' + item.TOTAL + '<br>')
          })
          res.status(200).send('<h1> Lista de pedidos <br></h1>' + array)
          
          //for each product, create a new div which has an ul with label and price,
  
        }).catch(error => {
          if (error) {
            res.status(404).send("productos no encontrados")
          }
        })
      } catch (e){console.error(e)}
})

//Adding a new PO:
//request the body from a form where user selects among the available products, 
//PO status will be changed automatically when a request is made to the endpoint,
//according to status updated by the PO Admin

router.route('/nuevo')
  .get(auth, (req, res) => {
    const usr = req.cookies.usu
    res.render('details', { author: usr })
  })
  .post( (req, res) => {
    const usDet = req.body
    res.cookie('usDet', usDet, { maxAge: ms('10m')/* , secure: true, httpOnly: true  */ })
    res.redirect('../pedidos/nuevo/productos')
  })
router.route('/nuevo/productos')
  .get( auth, (req, res) => {
    const usr = req.cookies.usu
    res.render('carrito', { author: usr })
  })
  .post( auth, (req, res) => {
    const usu = req.cookies.usu
    const payload = req.body;
    const now = new Date(Date.now()).toString()
    const prods = Object.keys(payload)
    const usDet = JSON.stringify(req.cookies.usDet)
    console.log( usDet, prods )

    let id_prod = [
      //Array with Selected products
    ]
    res.render('pocreado', { prods: prods, usDet: usDet, author: usu })

    /* const str = "req hamb"
    (str.includes("hamb")) */

    //console.log(id_prod.join())
    //id_prod.includes('hamb')
    let precio = [
      //request the price of multiple selected products and then add them to the sum.
    ]
    const direccion = req.body.dir
    const body = '<h1> Lista de productos <br></h1>'
    

    // miestras se encuentra la forma de agregar los productos 
    //como un string en los pedidos se ocultará el sequelize.query insert
    /* sequelize.query(
      `INSERT INTO PEDIDOS VALUES ( '1', '${now}', NULL, '2,3', 'precio', '${usu}', '${direccion}')`
    )
    .then((resp) =>{
      res.status(201).send('purchase order has been added correctly')
    })
    .catch(error => {
      if (error) {
        console.log(error)
        res.status(404).send(error)
      }
    }) */
})

router.get('/admin', auth, (req, res) => {
  // UPDATE PO Status
  // view all the Purchase Orders
    res.send('hello PO Admin')
})

/* router.post('/pedido', (req, res) => {
    let pedido = []
    pedido.push(req.body.producto + ': ' + req.body.precio )
    console.log(pedido)
    res.status(200).send(pedido)
}) */

module.exports = exports = router
