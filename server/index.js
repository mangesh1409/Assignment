const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const path = require('path');

var cors = require('cors')
const app = express();

// middleWare
app.use(cors())

app.use(bodyParser.json());

app.use('/',routes);

app.listen(8080,(req, res) => {

    console.log("server Started at 8080");

}); 