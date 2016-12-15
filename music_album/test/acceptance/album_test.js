'use strict'

const path = require('path')
const http = require('http')
const app = require(path.resolve('app'))
const albumsCollection = require(path.resolve('config/database')).get('music_library')

describe('Express CRUD', () => {
  beforeAll(() => {
    const server = http.createServer(app)
    server.listen(0)
    browser.baseUrl = 'http://localhost:' + server.address().port
    browser.ignoreSynchronization = true
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
      'use strict'

    it('should have a table with headers', () => {
      expect(element.all(by.css('tr')).all(by.css('td')).get(0).getText()).toEqual('Genre')
      expect(element.all(by.css('tr')).all(by.css('td')).get(1).getText()).toEqual('Artist')
      expect(element.all(by.css('tr')).all(by.css('td')).get(2).getText()).toEqual('Album')
    })

    // describe('Given the Baseball Cards list page', () => {
    //   //setup for tests
    //   beforeEach((done) => {
    //     albumsCollection.insert({
    //       artist: 'Miles Davis',
    //       genre: 'Jazz',
    //       album: 'Kind of Blue'
    //     }, done)
    //   })
    //
    //   afterEach((done) => {
    //     albumsCollection.remove({}, done)
    //   })
    //
    //   it('Then ')
    //
    //   beforeEach((done) => {
    //     albumsCollection.insert({
    //       artist: 'The B-52s',
    //       genre: 'Rock',
    //       album: 'Cosmic Thing'
    //     }, done)
    //   })

    })
  })
})
