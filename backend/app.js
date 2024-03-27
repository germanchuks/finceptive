const express = require('express');
const { db } = require('./db/db');
const { readdirSync } = require('fs')
const app = express()
const cookieParser = require('cookie-parser')

require('dotenv').config()

const PORT = process.env.PORT

//middlewares
app.use(express.json())

app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('Listening to port:', PORT)
    })
}

server()