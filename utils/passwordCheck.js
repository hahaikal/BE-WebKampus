const User = require('../models/user');
const bcrypt = require('bcrypt');

/**
 * @param {number} [nim]
 * @param {number} [nidn]
 * @param {string} password
 * @returns {Promise<{ success: boolean, message: string, user: object|null }>}
 */
const passwordCheck = async (nim, nidn, password) => {
  try {
    const whereClause = {};
    if (nim) {
      whereClause.nim = nim;
    } else if (nidn) {
      whereClause.nidn = nidn;
    } else {
      return { success: false, message: 'NIM atau NIDN harus diisi', user: null };
    }

    const user = await User.findOne({ where: whereClause });

    if (!user) {
      return { success: false, message: 'NIM atau NIDN tidak ditemukan', user: null };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { success: false, message: 'Password salah', user: null };
    }
    return { success: true, message: 'Login berhasil', user };
    
  } catch (error) {
    console.error('Error in passwordCheck:', error);
    throw error;
  }
};

module.exports = passwordCheck;