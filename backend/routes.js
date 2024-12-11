const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
app.use(cors()); // security measure to get resources from other domains in a secure manner
app.use(bodyParser.json()); // parse our data into json
app.use('/uploads', express.static('uploads')); // how we get our images later
app.use('/api', routes); 