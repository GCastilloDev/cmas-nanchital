const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

const port = process.env.PORT || 8080
const app = express()

app.use('/', serveStatic(path.join(__dirname, '/dist')))

app.listen(port)
console.log(`app is listening on port: ${port}`)