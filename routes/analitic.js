const express = require('express')
const router = express.Router()
const controller = require('../controllers/analitic')

router.get('/overview', controller.overview)
router.get('/analitic', controller.analytic)

module.exports = router