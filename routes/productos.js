const express = require('express');
const router = express.Router();
const auth = require('../public/autz')
const sequelize = require('../public/javascripts/sqlz.js');

router.route('/')
  //listar todos los productos
  .get((req, res) => {
    try{
      sequelize.query(
        `SELECT * FROM PRODUCTOS`, { type: sequelize.QueryTypes.SELECT}
        //`SELECT PRECIO FROM PRODUCTOS WHERE DESCRIPCION='panelas'`, { type: sequelize.QueryTypes.SELECT},
      ).then((resp) => {
        let array = []
        resp.forEach(item => {
          array.push(item.DESCRIPCION + ': ' + item.PRECIO + '<br>')
        })
        let tag = '<h1> Lista de productos <br></h1>'
        res.status(200).send('<h1> Lista de productos <br></h1>' + array.join(""))
        //for each product, create a new div which has an ul with label and price,
      }).catch(error => {
        if (error) {
          res.status(404).send("productos no encontrados")
        }
      })
    } catch (error) {
      if (error) {
        res.status(404).send("productos no encontrados")
      }
    }
  })
  //INSERTAR UN NUEVO PRODUCTO A LA BASE DE DATOS
  .post( auth, (req, res) => {
    const prod = req.body;
    sequelize.query(
      `INSERT INTO PRODUCTOS VALUES ( NULL , '${prod.DESCRIPCION}', 'si', '${prod.PRECIO}')`
    )
    .then((resp) =>{
      res.status(201).send('Producto creado')
    })
    .catch(error => {
      if (error) {
        res.status(404).send(error)
      }
    })
  })
//ADMINISTRADOR DE PRODUCTOS
router.get('/admin', auth, (req, res) => {
    res.send('hello Admin de productos<br/> Vaya a POSTMAN para agregar o editar productos')
})
//ACTUALIZAR PRODUCTOS
router.post('/updt-prod', auth, (req, res) => {
  const prod = req.body
  console.log(prod)
  sequelize.query(
    `UPDATE PRODUCTOS SET PRECIO='${prod.precio}' WHERE DESCRIPCION='${prod.producto}'`, 
    res.sendStatus(201)
  ).catch(error => {
    if (error) {
      res.status(404).send(error)
    }
  })
})
//ELIMINAR PRODUCTOS
router.delete('/delete', auth, (req, res) => {
  const prod = req.body
  console.log(prod)
  sequelize.query(
    `DELETE FROM PRODUCTOS WHERE DESCRIPCION='${prod.producto}'`,
    res.sendStatus(204)
  ).catch(error => {
    if (error) {
      res.status(404).send(error)
    }
  })
})

module.exports = exports = router