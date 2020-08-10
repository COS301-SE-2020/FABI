const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3002
const dbApi = require('./queries')

const dotenv = require('dotenv')
dotenv.config()

app.use(bodyParser.json())

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.get('/', (req, res) => {
    res.json({info: 'Node.js, Express, and Postgres API'})
})

app.get('/backup', dbApi.getReports)
/*app.get('/user/:id', dbApi.getUserById)

app.post('/createUser', dbApi.createUser)

app.put('/updateUser/:id', dbApi.updateUser)

app.delete('/deleteUser/:id', dbApi.deleteUser)*/

app.listen(port, () => {
    console.log(`App running on port: ${port}`)
})