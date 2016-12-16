const express = require('express')
const router = express.Router()
const db = require('../config/database')
/* GET home page. */
router.get('/', function(req, res, next) {
  let albumCollection = db.get('albums')
  albumCollection.find({}, (err, albums) =>{
    res.render('albums', {albums: albums})
  })
})
router.get('/new', (req, res, next) => {
  res.render('new');
})
router.post('/', (req, res, next) =>{
  let albumCollection = db.get('albums')
  albumCollection.insert(req.body, (err, album) =>{
    res.redirect('albums')
  })
})


module.exports = router
