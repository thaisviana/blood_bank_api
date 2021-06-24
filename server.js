const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const connectDB = require('./config/db');
require('dotenv').config()

const app = express()
const PORT = process.env.PORT

// Init Middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


// Connect Database
connectDB()

app.get('/', (req, res) => res.send('Hello!'))
app.use('/blood_bank', require('./routes/api/blood_bank'))

const server = app.listen(PORT, () => { console.log(`port ${PORT}`) })


module.exports =  {app , server}