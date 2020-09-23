const express = require('express');
const router = express.Router();
const auth = require('../public/autz')
const sequelize = require('../public/javascripts/sqlz.js');

//listar todos los productos
router.route('/')
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
  .post( auth, (req, res) => {
    try {
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
    } catch (e){
      if (e) {
        console.log(e)}
      }
  })

router.get('/admin', auth, (req, res) => {
    res.send('hello Admin de productos<br/> Vaya a POSTMAN para agregar o editar productos')
})

router.post('/updt-prod', auth, (req, res) => {
  try {
    const prod = req.body
    console.log(prod)
    sequelize.query(
      `UPDATE PRODUCTOS SET PRECIO='${prod.precio}' WHERE DESCRIPCION='${prod.producto}'`, 
      res.sendStatus(201)
    ).catch(err => console.error)
  } catch (e){console.error(e)}
})

router.delete('/delete', auth, (req, res) => {
  try {
    const prod = req.body
    console.log(prod)
    sequelize.query(
      `DELETE FROM PRODUCTOS WHERE DESCRIPCION='${prod.producto}'`,
      res.sendStatus(204)
    ).catch(err => console.error)
  } catch (e){console.error(e)}
})

module.exports = exports = router

/*FIND PRODUCTS */
/*   res.render('productos', { title: 'Express' });
      resp.find(x => {
        for (let i = 0; i < x.length; i++) {
          x[i].DESCRIPCION === 'panelas' ? console.log('found') : console.log('not this one')
        }
      })*/

      /*resp.map(x => { 
        for (let i = 0; i < x.length; i++) {
          x[i].DESCRIPCION === 'panelas'
          console.log('found')
        }
      })

/autores/:id
- GET: devuelve el autor con el id indicado
- DELETE: elimina el autor con el id indicado
- PUT: modifica el autor con el id indicado      
*/