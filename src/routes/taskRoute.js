const express = require('express')
const multer = require('multer')

let authController = require('../controllers/authController')

const router = express.Router()

// AUTHENTICATION
router.post('/auth/register', multer().array(), authController.registerAccount)
router.post('/auth/login', multer().array(), authController.loginAccount)

module.exports = router