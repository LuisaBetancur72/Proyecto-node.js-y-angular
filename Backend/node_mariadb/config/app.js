
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const user_routes = require('../start/UserRoutes'); 

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', user_routes);

module.exports = app;