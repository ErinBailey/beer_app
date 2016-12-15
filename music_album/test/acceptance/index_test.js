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

  describe('Given I visit /', () => {
    it('Then I see OMG Albums', () => {
      browser.get('/')
      expect(element(by.tagName('h1')).getText()).toEqual('OMG Albums!')
    })
    it('Then I see the link text', () => {
      browser.get('/')
      expect(element(by.tagName('a')).getText()).toEqual('Let me see the RIGHT NOW')
      let hrefText = element(by.cssContainingText("a","Let me see the RIGHT NOW")).getAttribute('href')
      expect(hrefText).toContain('/albums')
    })

  })
})
