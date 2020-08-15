var express = require('express');
var router = express.Router();

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
    res.sendStatus(201)
    console.log(req.body)
  })

router.route('/register')
  .get((req, res) => {
    res.render('register', { title: 'Express' });
    res.status(200)
    req.query.params
  })
  .post((req, res) => {
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
    res.render('productos', { title: 'Express' });
    res.status(200)
    res.json({ type: ''})
  })
  .post((req, res) => {
    res.sendStatus(201)
    console.log(req.body)
  })
  .put((req, res) => {
    res.sendStatus(418)
    console.log(req.headers)
    console.log(req.body)
    console.log(req.header)
  })

module.exports = router;
