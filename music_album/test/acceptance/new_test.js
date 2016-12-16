'use strict'

const path = require('path')
const http = require('http')
const app = require(path.resolve('app'))
const albumsCollection = require(path.resolve('config/database')).get('our_music_library')

describe('Express CRUD', () => {
  beforeAll(() => {
    const server = http.createServer(app)
    server.listen(0)
    browser.baseUrl = 'http://localhost:' + server.address().port
    browser.ignoreSynchronization = true
  })
    describe('When I visit the create album page', () =>{
      it('Then I will see a form to create an album', () =>{
        browser.get('albums/new')
        expect(element(by.tagName('h1')).getText()).toEqual('Create Album')
        expect(element(by.tagName('form')).getAttribute('name')).toEqual('Add-album')
        expect(element.all(by.tagName('input')).get(0).getAttribute('name')).toEqual('Artist')
        expect(element.all(by.tagName('input')).get(1).getAttribute('name')).toEqual('Album')
        expect(element(by.tagName('select')).getAttribute('name')).toEqual('Genre')
        expect(element.all(by.tagName('option')).get(0).getAttribute('value')).toEqual('Jazz')
        expect(element.all(by.tagName('input')).get(2).getAttribute('value')).toContain('Submit')

      })
      it('And I hit submit, Then it should redirect back to albums', () =>{
        var buttonClick = element.all(by.tagName('input')).get(2)
        buttonClick.click()
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/albums')
      })

    })
})
