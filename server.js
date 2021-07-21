const express = require('express')
var cors = require('cors')
const connectDB = require('./config/db');
const fileUpload = require('express-fileupload');
require('dotenv').config()

const app = express()
const PORT = process.env.PORT

// Init Middleware
app.use(cors())
app.use(express.json())

// Connect Database
connectDB()

app.use(fileUpload({
    createParentPath: true
}));


app.get('/', (req, res) => res.send('Hello!'))
app.use('/blood_bank', require('./routes/api/blood_bank'))
app.use('/upload', require('./routes/api/upload'))

const server = app.listen(PORT, () => { console.log(`port ${PORT}`) })


module.exports =  {app , server}