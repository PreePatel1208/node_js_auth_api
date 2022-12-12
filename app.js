require('dotenv').config()

require('./config/database').connect()

const express = require('express')

const bodyParser = require('body-parser');

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

const userRoute=require('./routes/note.routes')

const postRoute=require('./routes/post.route')

app.use('/',userRoute)

app.use('/',postRoute)

app.use(express.json())

module.exports = app



