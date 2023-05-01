const express = require('express')
const app = express()
const buyRoutes = require('./buyRoute')
const rentRoutes = require('./rentRoute')
const sellRoutes = require('./sellRoute')
const multerImage = require('./multerImage')

// initialize routes

// buy routes
app.use('/buy', buyRoutes);

// rent routes
app.use('/rent', rentRoutes);

// sell routes
app.use('/sell', sellRoutes);

app.use('/uploadImage', multerImage);

// export app
module.exports = app;