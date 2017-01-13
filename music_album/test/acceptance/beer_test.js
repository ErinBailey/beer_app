'use strict'

const path = require('path')
const http = require('http')
const app = require(path.resolve('app'))
const beersCollection = require(path.resolve('config/database')).get('beers')

describe('Express CRUD', () => {
  beforeAll(() => {
    const server = http.createServer(app)
    server.listen(0)
    browser.baseUrl = 'http://localhost:' + server.address().port
    browser.ignoreSynchronization = true
  })
  beforeEach((done) => {
    beersCollection.insert({
      Artist: 'Miles Davis',
      Genre: 'Jazz',
      Beer: 'Kind of Blue'
    }, done)
  })
  afterEach((done) => {
    beersCollection.remove({}, done)
  })

  describe('Given I visit /beers', () => {
    it('Then I see the beer header', () => {
      browser.get('/beers')
      expect(element(by.tagName('h1')).getText()).toEqual('Beers')
    })
    it('Then I see the link to create a new beer', () => {
      browser.get('/beers')
      expect(element(by.tagName('a')).getText()).toEqual('Create Beer')
      let hrefText = element(by.cssContainingText('a','Create Beer')).getAttribute('href')
      expect(hrefText).toContain('/new')
    })

    describe('Given beer data', () => {

      it('should have a table with headers', () => {
        expect(element.all(by.css('tr')).all(by.css('td')).get(0).getText()).toEqual('Type')
        expect(element.all(by.css('tr')).all(by.css('td')).get(1).getText()).toEqual('Brewery')
        expect(element.all(by.css('tr')).all(by.css('td')).get(2).getText()).toEqual('Name')

      })
    })

    describe('Given the beers list page', () => {
      //setup for tests
      beforeEach(() => {
        browser.get('/beers')
      })
      it('Then we should see one record inserted', () => {
        expect(element.all(by.css('tr')).get(1).all(by.css('td')).get(0).getText()).toEqual('Jazz')
        expect(element.all(by.css('tr')).get(1).all(by.css('td')).get(1).getText()).toEqual('Miles Davis')
        expect(element.all(by.css('tr')).get(1).all(by.css('td')).get(2).getText()).toEqual('Kind of Blue')
        expect(element.all(by.css('a')).get(1).getAttribute('href').getText()).toEqual('Kind of Blue')
      })


      // it('Then We will see the beers from the database', (done) =>{
      //
      // })
    })
  })
})
