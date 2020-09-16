const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize('mariadb://root:juanseromo1208@localhost:3306/delilah-db', {
  dialect: 'mariadb',
  dialectOptions: {useUTC: false,
    timezone: process.env.db_timezone
  },
  define: {
    timestamps: false // true by default
  }
})

/* GET home page. */
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

router.route('/productos')
  .get((req, res) => {
    try{
      sequelize.query(
        `SELECT * FROM PRODUCTOS`, { type: sequelize.QueryTypes.SELECT},
        res.render('productos', { title: 'Express' })
        //`SELECT PRECIO FROM PRODUCTOS WHERE DESCRIPCION='panelas'`, { type: sequelize.QueryTypes.SELECT},
      ).then((resp) => {
        console.log(resp)
      })
    } catch (e){console.error(e)}
  })
  .post( (req, res) => {
    try {
      const prod = req.body;
      sequelize.query(
        `INSERT INTO PRODUCTOS VALUES ( NULL , '${prod.product}', '${prod.disponible}', '${prod.price}')`,
        res.sendStatus(201)
      )
    } catch (e){console.error(e)}
  })

router.post('/productos/updt-prod', (req, res) => {
  try {
    const prod = req.body
    console.log(prod)
    sequelize.query(
      `UPDATE PRODUCTOS SET PRECIO='${prod.precio}' WHERE DESCRIPCION='${prod.producto}'`, 
      res.sendStatus(201)
    ).catch(err => console.error)
  } catch (e){console.error(e)}
})

router.delete('/productos/delete', (req, res) => {
  try {
    const prod = req.body
    console.log(prod)
    sequelize.query(
      `DELETE FROM PRODUCTOS WHERE DESCRIPCION='${prod.producto}'`,
      res.sendStatus(204)
    ).catch(err => console.error)
  } catch (e){console.error(e)}
})

router.get('/pizza', (req, res) => {
  res.render('pizza', { title: 'Express' });
})


module.exports = router;

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
      


res.json(e.errors[0].message)


*/