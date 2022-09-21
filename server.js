require('dotenv').config()

const DATABASE_URL = require('node:process')

const express = require('express')
const http = require('http')
const mongoose = require('mongoose')

const router = require('./routers/subscribers.router')

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})

const PORT = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const db = mongoose.connection

db.on('error', (error) => console.log(error))
db.on('connected', () => console.log("Connected to Database"))
db.on('disconnected', () => console.log("Disconnected to Database"))

// use the json middleware 
app.use(express.json())

app.use('/subscribers', router)

server.listen(PORT, ()=> console.log(`Listening on port ${PORT}`))

