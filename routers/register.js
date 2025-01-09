const { Op } = require('sequelize')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const sequelize = require('../dbConfig')
const Register = require('../models/register')

router.post('/mahasiswa', async(req, res) => {
    const { name, email, NIM, password } = req.body

    try {
        const existingEmail  = await Register.findOne({
            where: {
              email: {
                [Op.eq]: email,
              },
            },
        });
        const existingNIM  = await Register.findOne({
            where: {
              NIM: {
                [Op.eq]: NIM,
              },
            },
        });

        if (existingEmail ) {
            return res.status(400).json({ message: 'Email sudah terdaftar' });
        }
        if (existingNIM ) {
            return res.status(400).json({ message: 'NIM sudah terdaftar' });
        }

        const bcryptPass = await bcrypt.hash(password, 10)
        const mahasiswa = Register.build({
            name,
            email,
            identifier: NIM,
            password: bcryptPass,
        });

        mahasiswa.tableName = 'mahasiswa';
        mahasiswa.sequelize = sequelize;
        await mahasiswa.save()
        res.status(200).json({
            metadata: 'berhasil register',
            data: user
        })

    } catch(e) {
        res.status(400).json({ message: e.message })
    }
})

router.post('/dosen', async(req, res) => {
    const { name, email, NIDN, password } = req.body

    try {
        const existingEmail  = await Register.findOne({
            where: {
              email: {
                [Op.eq]: email,
              },
            },
        });
        const existingNIDN  = await Register.findOne({
            where: {
              NIDN: {
                [Op.eq]: NIDN,
              },
            },
        });

        if (existingEmail ) {
            return res.status(400).json({ message: 'Email sudah terdaftar' });
        }
        if (existingNIDN ) {
            return res.status(400).json({ message: 'NIDN sudah terdaftar' });
        }

        const bcryptPass = await bcrypt.hash(password, 10)
        const user = await Register.create({
            name,
            email, 
            NIDN,
            password: bcryptPass
        })

        res.status(200).json({
            metadata: 'berhasil register',
            data: user
        })

    } catch(e) {
        res.status(400).json({ message: e.message })
    }
})

module.exports = router