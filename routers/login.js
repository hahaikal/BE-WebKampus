const express = require('express');
const router = express.Router();
const passwordCheck = require('../utils/passwordCheck');

router.post('/', async (req, res) => {
  try {
    const { nim, nidn, password } = req.body;

    if ((!nim && !nidn) || !password) {
      return res.status(400).json({ success: false, message: 'NIM atau NIDN dan password harus diisi' });
    }

    const { success, message, user } = await passwordCheck(nim, nidn, password);

    if (!success) {
      return res.status(400).json({ success, message });
    }
    res.status(200).json({ success, message, user });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server', error: error.message });
  }
});

module.exports = router;