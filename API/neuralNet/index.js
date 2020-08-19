const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8080;
const NN = require('./NeuralNet')
var NNjson;


app.use(bodyParser.json())

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.post('/', async (req, res) => {
    var i = await NN.predict(req);
    res.send(i);
})


  app.listen(port, () => {
    console.log(`App running on port: ${port}`)
    //NN.start();
   
})
