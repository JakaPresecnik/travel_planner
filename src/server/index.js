//storing data array
let savedTrips = [{
  todayDate: "2020-2-13",
  leaveDate: "2020-02-20",
  returnDate: "2020-02-29",
  image: "https://pixabay.com/get/57e5d0454f54ad14f6da8c7dda79367a1d3ddee553596c4870277ad19e4dcd59bb_640.jpg",
  city: "Moscow",
  country: "Russia",
  details: {
    full_name: "Russian Federation",
    region: "Europe",
    subregion: "Eastern Europe",
    population: 146599183,
    capital: "Moscow",
    flag_URL: "https://restcountries.eu/data/rus.svg",
    language: "Russian",
    currency: "Russian ruble"
  },
  tempHigh: 4,
  tempLow: 0,
  weather: "Foggy starting in the afternoon.",
  weatherIcon: "./src/client/img/snow.svg"
}];

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


app.post('/add', (res, req) => res.send('POST recieved!'));

app.post('/addEntry', addEntry);
app.post('/remove', removeEntry);

//function that stores data
function addEntry(req,res) {
  savedTrips.push(req.body);
  res.send(savedTrips);
}
//removes entry
function removeEntry(req,res) {
  savedTrips.splice(req.body.index, 1);
  console.log(savedTrips);
}

app.get('/all', (req, res) => res.send(savedTrips));

module.exports = server;
