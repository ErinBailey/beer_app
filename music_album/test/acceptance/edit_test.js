'use strict'

const path = require('path')
const http = require('http')
const app = require(path.resolve('app'))

const beersCollection = require(path.resolve('config/database')).get('beers')

describe('Given an edit beer page', () =>{
  describe('When I visit the edit beer page', () =>{
    it('Will dislpay a form to edit the beer details', () =>{
      
    })
  })
})
