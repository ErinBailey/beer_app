'use strict'

const path = require('path')
const http = require('http')
const app = require(path.resolve('app'))
const albumsCollection = require(path.resolve('config/database')).get('albums')

describe('Express CRUD', () => {
  beforeAll(() => {
    const server = http.createServer(app)
    server.listen(0)
    browser.baseUrl = 'http://localhost:' + server.address().port
    browser.ignoreSynchronization = true
  })
  beforeEach((done) => {
    albumsCollection.insert({
      Artist: 'Miles Davis',
      Genre: 'Jazz',
      Album: 'Kind of Blue'
    }, done)
  })
  afterEach((done) => {
    albumsCollection.remove({}, done)
  })

  describe('Given I visit /albums', () => {
    it('Then I see the Album header', () => {
      browser.get('/albums')
      expect(element(by.tagName('h1')).getText()).toEqual('Albums')
    })
    it('Then I see the link to create a new album', () => {
      browser.get('/albums')
      expect(element(by.tagName('a')).getText()).toEqual('Create Album')
      let hrefText = element(by.cssContainingText('a','Create Album')).getAttribute('href')
      expect(hrefText).toContain('/new')
    })

    describe('Given album data', () => {

      it('should have a table with headers', () => {
        expect(element.all(by.css('tr')).all(by.css('td')).get(0).getText()).toEqual('Genre')
        expect(element.all(by.css('tr')).all(by.css('td')).get(1).getText()).toEqual('Artist')
        expect(element.all(by.css('tr')).all(by.css('td')).get(2).getText()).toEqual('Album')

      })
    })

    describe('Given the Albums list page', () => {
      //setup for tests
      beforeEach(() => {
        browser.get('/albums')
      })
      it('Then we should see one record inserted', () => {
        expect(element.all(by.css('tr')).get(1).all(by.css('td')).get(0).getText()).toEqual('Jazz')
        expect(element.all(by.css('tr')).get(1).all(by.css('td')).get(1).getText()).toEqual('Miles Davis')
        expect(element.all(by.css('tr')).get(1).all(by.css('td')).get(2).getText()).toEqual('Kind of Blue')
        expect(element.all(by.css('a')).get(1).getAttribute('href').getText()).toEqual('Kind of Blue')
      })


      // it('Then We will see the albums from the database', (done) =>{
      //
      // })
    })
  })
})
