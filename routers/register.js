const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const checkEmail = require('../utils/checkEmail')
const Register = require('../models/register')

router.post('/mahasiswa', async(req, res) => {
    const { name, email, NIM, password } = req.body
    const Mahasiswa = Register ("NIM", "mahasiswa")

    try {
        if(await checkEmail(Mahasiswa, email,'NIM' , NIM, res)) return

        const bcryptPass = await bcrypt.hash(password, 10)
        const mahasiswa = await Mahasiswa.create({
            name,
            email,
            NIM,
            password: bcryptPass,
        });

        res.status(200).json({
            metadata: 'berhasil register',
            data: mahasiswa
        })

    } catch(e) {
        res.status(400).json({ message: e.message })
    }
})

router.post('/dosen', async(req, res) => {
    const { name, email, NIDN, password } = req.body
    const Dosen = Register ("NIDN", "dosen")

    try {
        if(await checkEmail(Dosen, email, 'NIDN', NIDN, res)) return

        const bcryptPass = await bcrypt.hash(password, 10)
        const dosen = await Dosen.create({
            name,
            email,
            NIDN,
            password: bcryptPass,
        });

        res.status(200).json({
            metadata: 'berhasil register',
            data: dosen
        })

    } catch(e) {
        res.status(400).json({ message: e.message })
    }
})

module.exports = router