const bcrypt = require('bcrypt')
const loginModel = require('../models/register')

const passwordCheck = async(NIM, password) => {
    const user = await loginModel.findOne({where: { NIM : NIM }})
    const validatePassword = await bcrypt.compare(password, user.password)
    return {user, validatePassword}
}

module.exports = passwordCheck