require('dotenv').config()
const express = require('express')
const massive = require('massive')
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env
const ctrl = require('./controller')

const app = express()

app.use(express.json())

app.post('/auth/register', ctrl.register)

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, ()=> console.log(`${SERVER_PORT} slices of carrot cake`))
})