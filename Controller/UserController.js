const jwt = require("jsonwebtoken");
const userModel = require("../modal/userModel");
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config()

const UserRegister = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existUser = await userModel.findOne({ email: email })
        if (existUser) {
            return res.status(400).json({
                error: true,
                message: "User Already Exist"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const result = await userModel.create({
            email: email,
            password: hashPassword
        })

        const token = await jwt.sign({ email: email, id: result._id }, process.env.SecrectKey);

        res.status(201).json({
            error: false,
            message: result,
            token: token
        })



    } catch (error) {
        console.log(error.message);
    }
}


const UserLogin = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    try {
        const existEmail = await userModel.findOne({ email: email })
        if (!existEmail) {
            return res.status(404).json({
                error: true,
                message: 'Email Not Found'
            })
        }

        const credentials = existEmail.password;
        const matchPassword = await bcrypt.compare(password, credentials)

        if (!matchPassword) {
            return res.status(404).json({
                error: true,
                message: 'Please Enter Currect Password'
            })
        }

        const token = await jwt.sign({ email: existEmail.email, id: existEmail.id }, process.env.SecrectKey)
        res.status(201).json({
            error: false,
            message: 'Login Successfull',
            token: token
        })

    } catch (error) {
        console.log(error);

    }
}

module.exports = {
    UserRegister,
    UserLogin
}