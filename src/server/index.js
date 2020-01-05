const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

// TO BE CHANGED ONCE WEBPACK INSTALLED
app.use(express.static('./dist'));

app.get('/', function (req, res) {
  res.status(200).send('ok');
});

const server = app.listen(8010, () => console.log('Server running on localhost port 8010'));

module.exports = server;
