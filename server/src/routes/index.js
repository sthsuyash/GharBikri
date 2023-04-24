const express = require('express')
const app = express()
const authRoutes = require('./authRoute')
const dashBoardRoutes = require('./dashboardRoute')
const rentRoute = require('./rentRoute')
const buyRoute = require('./buyRoute')
const router = express.Router();
// const rent = require('./controllers/rentController')
// initialize routes

// auth routes
app.use('/auth', authRoutes);

// dashboard route
app.use('/dashboard', dashBoardRoutes);

//rent route
app.use('/rent', rentRoute);

//buy route
app.use('/buy', buyRoute);

// export app
module.exports = app;