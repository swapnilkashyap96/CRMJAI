const express = require('express')
require('colors');
const bodyParser = require('body-parser');
const cors = require('cors')
const dotenv = require('dotenv');
const ConnectDB = require('./Config/ConnectDB');
const { router } = require('./Router/Router');
const app = express()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use(cors())

dotenv.config()

ConnectDB()

const port = process.env.PORT || 5000;


app.use('/', router)

app.listen(port, (req, res) => {
    console.log(`'Server is runing up on port ${port}',`.yellow);
})