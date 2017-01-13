'use strict'

const path = require('path')
const http = require('http')
const app = require(path.resolve('app'))
const beersCollection = require(path.resolve('config/database')).get('our_beer_library')

describe('Express CRUD', () => {
  beforeAll(() => {
    const server = http.createServer(app)
    server.listen(0)
    browser.baseUrl = 'http://localhost:' + server.address().port
    browser.ignoreSynchronization = true
  })
    afterEach((done) => {
    beersCollection.remove({}, done)
  })

    describe('When I visit the create beer page', () =>{
      it('Then I will see a form to create an beer', () =>{
        browser.get('beers/new')
        expect(element(by.tagName('h1')).getText()).toEqual('Create Beer')
        expect(element(by.tagName('form')).getAttribute('name')).toEqual('Add-beer')
        expect(element.all(by.tagName('input')).get(0).getAttribute('name')).toEqual('Brewery')
        expect(element.all(by.tagName('input')).get(1).getAttribute('name')).toEqual('Beer')
        expect(element(by.tagName('select')).getAttribute('name')).toEqual('Type')
        expect(element.all(by.tagName('option')).get(0).getAttribute('value')).toEqual('Ale')
        expect(element.all(by.tagName('input')).get(2).getAttribute('value')).toContain('Submit')

      })
      it('And I hit submit, Then it should redirect back to beers', () =>{
        var buttonClick = element.all(by.tagName('input')).get(2)
        buttonClick.click()
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/beers')
      })

    })
})
