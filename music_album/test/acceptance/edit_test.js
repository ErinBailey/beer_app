'use strict'

const path = require('path')
const http = require('http')
const app = require(path.resolve('app'))

const albumsCollection = require(path.resolve('config/database')).get('albums')

describe('Given an edit album page', () =>{
  describe('When I visit the edit album page', () =>{
    it('Will dislpay a form to edit the album details', () =>{
      
    })
  })
})
