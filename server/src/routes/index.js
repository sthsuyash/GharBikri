const express = require('express')
const app = express()
const authRoutes = require('./authRoute')
const dashBoardRoutes = require('./dashboardRoute')
const propertiesRoutes = require('./properties')

// initialize routes

// auth routes
app.use('/auth', authRoutes);

// dashboard route
app.use('/dashboard', dashBoardRoutes);

// properties routes
app.use('/properties', propertiesRoutes);

// export app
module.exports = app;