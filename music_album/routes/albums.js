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
router.get('/:id', (req, res, next) =>{
   const albumCollection = db.get('albums')

     albumCollection.findOne({_id: req.params.id}, (err, album) =>{
     //   if(err){
     //     next(err)
     //   }
     console.log(album)
       res.render('show', {album: album})


     })


})

module.exports = router
