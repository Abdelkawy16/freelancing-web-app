require('dotenv').config()
require('../db/dbconnection')
const path = require('path')

const express = require('express')
const cors = require("cors")

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/findAsset/:name", (req, res) => {
    let name = path.join(__dirname, "../", req.params.name)
    res.sendFile(name)
})

// routes files
const userRoutes = require('../routes/user.routes')
const jobRoutes = require('../routes/job.routes')

app.use(userRoutes)
app.use('/job', jobRoutes)

module.exports = app