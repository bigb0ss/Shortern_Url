const express = require('express')
const pg = require('pg')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

const createUrl = require('./routes/create_url')
const redirectUrl = require('./routes/redirect_url')

app.use(cors())

app.use(bodyParser.json())

app.use(express.urlencoded({ extended: true }))
app.get('/:token', redirectUrl)
app.post('/', createUrl)

app.listen(7000, '0.0.0.0', () => {
    console.log("Server started in port : 7000")
})