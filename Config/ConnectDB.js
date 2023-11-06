const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()

const ConnectDB = async () => {
    try {
        let response = await mongoose.connect(process.env.MONGODB);
        console.log(`Database Connected ${response.connection.host}`.blue);
    } catch (error) {
        console.log(error.inverse);
    }
}

module.exports = ConnectDB