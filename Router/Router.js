const express = require('express')
const { UserRegister, UserLogin } = require('../Controller/UserController')

const router = express.Router()

router.post('/user/register', UserRegister)
router.post('/user/login', UserLogin)


module.exports = {
    router
}