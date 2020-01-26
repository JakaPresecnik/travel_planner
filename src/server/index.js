//storing data array
let savedTrips = [];

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

app.get('/all', (req, res) => res.send(savedTrips));
app.post('/add', (res, req) => res.send('POST recieved!'));

app.post('/addEntry', addEntry);

//function that stores data
function addEntry(req,res) {
  savedTrips.push(req.body);
  console.log(req.body);
}

module.exports = server;
