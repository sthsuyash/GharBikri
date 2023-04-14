const express = require('express')
const app = express()
const authRoutes = require('./authRoute')
const dashBoardRoutes = require('./dashboardRoute')

// initialize routes

// auth routes
app.use('/auth', authRoutes);

// dashboard route
app.use('/dashboard', dashBoardRoutes);

// export app
module.exports = app;