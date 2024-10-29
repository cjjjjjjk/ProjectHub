const express = require('express')
const router = express.Router()
const { Users, Projects } = require('../models')
const { validateToken } = require('../middleware/auth')
const { Model } = require('sequelize')


module.exports = router