const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const stormpath = require('express-stormpath');

const index = require('./routes/index')
const users = require('./routes/users')
const beers = require('./routes/beers')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(stormpath.init(app, {
  client: {
    apiKey: {
      id: '22RQ8GZ1Z1QJFSA8HVD185CKY',
      secret: 'wCN5cuQVo7znWwNJv00LWZREq+HTR2jphttbIqF4KL0',
    }
  },
  application: {
    href: 'https://api.stormpath.com/v1/applications/3nyfZ3X3sQJEPtJarFN3B5'
  }
}))

app.use('/', index)
app.use('/users', users)
app.use('/beers', beers)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  //console.log(err)
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
