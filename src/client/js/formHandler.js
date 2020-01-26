import swal from 'sweetalert'
import { getPlaces, darkSkyWeather, pixabayImage, tillDeparture, countryDetails } from './app'
import { createPopup } from './manipulatingDOM'

let d = new Date()
let today = d.getFullYear() +'-'+ d.getMonth() + 1 +'-'+ d.getDate()

//created an object that will store the data on the client side, and have a method for calculating days
let travelTo = {
  todayDate: today,
}
//functionality for posting a trip with additional warnings if not all forms done
const submitHandler = (event) => {
  event.preventDefault()
  let destination = document.getElementById('destination').value
  let departing = document.getElementById('depart').value
  let returning = document.getElementById('return').value
  //converting leaving date to UNIX time - for darkSkyWeb
  let leaveDate = Date.parse(departing)/1000
  //some tests to make sure the uder fills the required forms
  if(destination == '') {
    swal("Destination required!", "You must enter the destination!", "warning")
    return undefined
  }
  if(departing == '') {
    swal("Date of departure required!", "You must enter the date of departure!", "warning")
    return undefined
  }
  if(returning == '') {
    swal("Date of returning required!", "You are just traveling there right?!", "warning")
    return undefined
  }

  travelTo.leaveDate = departing
  travelTo.returnDate = returning

  Client.pixabayImage(destination)
  .then((data) => {
      travelTo.image = data
  })
  .then(
  Client.getPlaces(destination)
  .then((data) => {
    travelTo.city = data.toponymName
    travelTo.country = data.countryName
    Client.countryDetails(data.countryName)
    .then((data) => {
      travelTo.details = data
    })
    Client.darkSkyWeather(data.lat, data.lng, leaveDate)
    .then((data) => {
      travelTo.tempHigh = Math.round(toC(data.temperatureHigh))
      travelTo.tempLow = Math.round(toC(data.temperatureLow))
      travelTo.weather = data.summary
      travelTo.weatherIcon = `./src/client/img/${data.icon}.svg`
      createPopup(travelTo, daysAway)
    })
  }))
  let daysAway = Client.tillDeparture(departing, today)
}
// it resets the search if user not satisfied with the outcome
const resetForm = (event) => {
  document.getElementById('popup').remove()
}
// it sends the travelTo object to the server and updates the site
// Used a full address due to dev server running on 8080
const postToServer = (event) => {
  postData('http://localhost:8010/addEntry', travelTo)
}

const toC = (tempF) => (tempF - 32) * 1.8

const postData = async (url = '', data = {}) => {
  console.log(data)
  // fetch data
  const response = await fetch (url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  try {
    const newData = await response.json();
    console.log(newData)
    return newData
  } catch (error) {
      console.log('error', error)
    }
}

export { submitHandler, resetForm, postToServer }
