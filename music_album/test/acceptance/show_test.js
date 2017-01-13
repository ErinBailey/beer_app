'use strict'

const path = require('path')
const http = require('http')
const app = require(path.resolve('app'))

const beersCollection = require(path.resolve('config/database')).get('beers')

var beerToInsert =
{
  Brewery: 'Revolution',
  Type: 'Lager',
  Name: 'Fist City'
}

describe('Given there is an beer show page', () =>{
  beforeAll(() => {
    const server = http.createServer(app)
    server.listen(0)
    browser.baseUrl = 'http://localhost:' + server.address().port
    browser.ignoreSynchronization = true

  })
  beforeEach((done) => {
    beersCollection.insert(beerToInsert, done)
  })

  afterEach((done) => {
    beersCollection.remove({}, done)
  })

  describe('When I visit the page', () =>{
    it('Then I will see the beer details', () =>{
      browser.get('/beers/' + beerToInsert._id)
      expect(element(by.tagName('h1')).getText()).toEqual('Fist City')
      expect(element.all(by.tagName('p')).get(0).getText()).toEqual('Lager')
      expect(element(by.id('brewery')).getText()).toEqual('Revolution')
    })
  })
})
