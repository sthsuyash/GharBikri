const express = require('express')
const app = express()
const authRoutes = require('./authRoute')
const dashBoardRoutes = require('./dashboardRoute')
const propertiesRoutes = require('./properties')
const uploadRoutes = require('./properties/multerImage')

// check if api is running
app.get('/', (req, res) => {
    res.send('Api is running')
})

// initialize routes

// auth routes
app.use('/auth', authRoutes);

// dashboard route
app.use('/dashboard', dashBoardRoutes);

// properties routes
app.use('/properties', propertiesRoutes);

// upload routes
app.use('/upload', uploadRoutes);

// export app
module.exports = app;