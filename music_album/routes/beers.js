const express = require('express')
const router = express.Router()
const db = require('../config/database')
var StatsD = require('node-statsd')

/* GET home page. */
router.get('/', function(req, res, next) {
  let beerCollection = db.get('beers')
  beerCollection.find({}, (err, beers) =>{
    res.render('beers', {beers: beers})
  })
})
router.get('/new', (req, res, next) => {
  res.render('new');
  let client = new StatsD();
  client.increment('new')
})
router.post('/', (req, res, next) =>{
  let beerCollection = db.get('beers')
  beerCollection.insert(req.body, (err, beer) =>{
    res.redirect('beers')
    let client = new StatsD();
    client.increment('add')    
  })
})
router.get('/:id', (req, res, next) =>{
   const beerCollection = db.get('beers')

     beerCollection.findOne({_id: req.params.id}, (err, beer) =>{
     //   if(err){
     //     next(err)
     //   }
     console.log(beer)
       res.render('show', {beer: beer})
       let client = new StatsD();
       client.increment('show')

     })


})

module.exports = router
