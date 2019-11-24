const express = require('express')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const analyticRoutes = require('./routes/analitic')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')
const app = express()

app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)

module.exports = app