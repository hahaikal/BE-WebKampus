const bcrypt = require('bcrypt')
const LoginModel = require('../models/register')

const passwordCheck = async(Induk, NIMorNIDN, password) => {
    if (Induk === "NIM") {
        const Login = LoginModel("NIM", "mahasiswa")
        const user = await Login.findOne({where: { [Induk]: NIMorNIDN }})
        const validatePassword = await bcrypt.compare(password, user.password)
        return {user, validatePassword}
    } else {
        const Login = LoginModel("NIDN", "dosen")
        const user = await Login.findOne({where: { [Induk]: NIMorNIDN }})
        const validatePassword = await bcrypt.compare(password, user.password)
        return {user, validatePassword}
    }
}

module.exports = passwordCheck