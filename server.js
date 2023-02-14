require('dotenv').config()
const port = process.env.PORT || 9999
const express = require('express')
const cors = require('cors')
const router = require('./src/modules/routes')
const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

app.listen(port, console.log(port))