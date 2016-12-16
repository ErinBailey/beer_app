'use strict'

const path = require('path')
const http = require('http')
const app = require(path.resolve('app'))

const albumsCollection = require(path.resolve('config/database')).get('albums')

var albumToInsert =
{
  Artist: 'Miles Davis',
  Genre: 'Jazz',
  Album: 'Kind of Blue'
}

describe('Given there is an album show page', () =>{
  beforeAll(() => {
    const server = http.createServer(app)
    server.listen(0)
    browser.baseUrl = 'http://localhost:' + server.address().port
    browser.ignoreSynchronization = true

  })
  beforeEach((done) => {
    albumsCollection.insert(albumToInsert, done)
  })

  afterEach((done) => {
    albumsCollection.remove({}, done)
  })

  fdescribe('When I visit the page', () =>{
    it('Then I will see the ablum details', () =>{
      browser.get('/albums/' + albumToInsert._id)
      expect(element(by.tagName('h1')).getText()).toEqual('Kind of Blue')
      expect(element.all(by.tagName('p')).get(0).getText()).toEqual('Jazz')
      expect(element(by.id('artist')).getText()).toEqual('Miles Davis')
    })
  })
})
