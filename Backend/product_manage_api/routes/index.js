var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'product',
  password: 'hongngoc19',
  port: 5432,
})

/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index', { title: 'Express' });
});
//api get test data 
router.get('/getProduct', function (req, res, next) {

  pool.query('SELECT * FROM tbl_product', (err, response) => {
    if (err) {
      console.log(err)
    }
    else {
      //console.log(response.rows)
      res.send(response.rows)
    }
    // pool.end()
  })
  // res.render('index', { title: 'Express' });
});
router.get('/add', function (req, res, next) {
  res.render('addProduct');
});
router.post('/add', function (req, res, next) {
  var name = req.body.txtname,
    price = req.body.txtprice,
    image = req.body.txtimage;
  pool.query("INSERT INTO tbl_product(name, price, image) VALUES ($1,$2,$3)",
    [name, price, image], (err, response) => {
      if (err) {
        res.send(err);
      }
      else {
        res.send('insert success');
      }
    });
  //res.send('da nhan data' + name + price + image);
  //console.log('okokok');
});
module.exports = router;
