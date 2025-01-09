const express = require('express')
const router = express.Router()
const passwordCheck = require('../utils/passwordCheck')
const session = require('express-session')

router.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: true
}))

router.post('/', async (req, res) => {
    const { NIM, password } = req.body

    try {
        const chec = await passwordCheck(NIM, password)
        if(chec.validatePassword) {
            res.status(200).json({
                metadata: 'Login Success',
                data: chec.user
            })   

            req.session.user = chec

        } else {
            res.status(400).json({
                metadata: 'Username atau password salah'
            })
        }
    } catch(e) {
        res.status(500).send(e.message)
    }
})

module.exports = router