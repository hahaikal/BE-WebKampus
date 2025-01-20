const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

/**
 * @route 
 * @access 
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, bio, telepon, fakultas, prodi, password, confirmPassword } = req.body;

    const user = await User.findOne({ where: { id } });

    const updatedData = {};
    updatedData.name = name ? name : null;
    updatedData.email = email ? email : null;
    updatedData.bio = bio ? bio : null;
    updatedData.telepon = telepon ? telepon : null;
    updatedData.fakultas = fakultas ? fakultas : null;
    updatedData.prodi = prodi ? prodi : null;
    updatedData.password = password ? await bcrypt.hashSync(password, 10) : user.password;

    await User.update(updatedData, { where: { id } });

    res.status(200).json({ message: 'Profil berhasil diperbarui' });
  } catch (e) {
    return res.status(500).json(user);
  }
});

module.exports = router;
