const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

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

router.route('/login')
  .get((req, res) => {
    res.render('login', { title: 'Express' });
    res.status(200)
  })
  .post((req, res) => {
    res.sendStatus(202)
    const user = req.body;
    console.log(user.username, user.password)
    console.log(req.body)
  })
  

router.route('/register')
  .get((req, res) => {
    res.render('register', { title: 'Express' });
    res.status(200)
  })
  .post( (req, res) => {
    res.sendStatus(201)
    console.log(req.body)
  })
  .put((req, res) => {
    res.sendStatus(418)
    console.log(req.headers)
    console.log(req.body)
    console.log(req.header)
  })

router.route('/productos')
  .get((req, res) => {
    try{
      sequelize.query(
        `SELECT * FROM PRODUCTOS`, { type: sequelize.QueryTypes.SELECT},
        res.render('productos', { title: 'Express' })
        //`SELECT PRECIO FROM PRODUCTOS WHERE DESCRIPCION='panelas'`, { type: sequelize.QueryTypes.SELECT},
      ).then((resp) => {
        console.log(JSON.stringify(resp))
      })
    } catch (e){console.error(e)}

      /*res.render('productos', { title: 'Express' });
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
      })*/
  })
  .post( (req, res) => {
    try {
      const prod = req.body;
      sequelize.query(
        `INSERT INTO PRODUCTOS VALUES ( NULL , '${prod.product}', '${prod.disponible}', '${prod.price}')`, { type: sequelize.QueryTypes.SELECT},
        res.sendStatus(201)
      )
    } catch (e){console.error(e)}
    
    
/*
    .then(resultados => {
      res.status(201);
      res.end
      //console.log(resultados, 'succesfyly added product')
    }).catch(console.error)
  */    
  })
  .put((req, res) => {
    res.sendStatus(418)
    console.log(req.headers)
    console.log(req.body)
    console.log(req.header)
  })

module.exports = router;


//UPDATE `delilah-db`.`PRODUCTOS` SET `ID_PROD` = '2' WHERE (`ID_PROD` = '47');