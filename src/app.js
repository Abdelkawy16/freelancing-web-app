require('dotenv').config()
require('../db/dbconnection')

const express = require('express')
const cors = require("cors")

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes files
const userRoutes = require('../routes/user.routes')
const jobRoutes = require('../routes/job.routes')

app.use(userRoutes)
app.use('/job',jobRoutes)

module.exports = app