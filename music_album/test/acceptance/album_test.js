'use strict'

const path = require('path')
const http = require('http')
const app = require(path.resolve('app'))

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
  })
})
