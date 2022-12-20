require('dotenv').config()

require('./config/database').connect()
var cors = require('cors')
const express = require('express')
const multer = require('multer');


const bodyParser = require('body-parser');
const app = express()
app.use(cors())


app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

const userRoute=require('./routes/note.routes')

const postRoute=require('./routes/post.route')

app.use('/',userRoute)

app.use('/',postRoute)

app.use(express.json())
// Function to serve all static files
// inside public directory.
app.use(express.static('uploads')); 
app.use('/uploads', express.static('uploads'));

module.exports = app



