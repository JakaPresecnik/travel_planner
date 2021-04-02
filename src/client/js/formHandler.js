import swal from 'sweetalert'
import { getPlaces, darkSkyWeather, pixabayImage, tillDeparture, countryDetails } from './app'
import { createPopup, buildTrips } from './manipulatingDOM'

let d = new Date()
let today = d.getFullYear() +'-'+ (d.getMonth() + 1) +'-'+ d.getDate()

const toC = (tempF) => {return (tempF - 32) / 1.8}

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
      travelTo.tempHigh = Math.round(toC(data[0].temperatureHigh))
      travelTo.tempLow = Math.round(toC(data[0].temperatureLow))
      travelTo.weather = data[0].summary
      travelTo.weatherIcon = `./src/client/img/${data[0].icon}.svg`
      createPopup(travelTo, daysAway)
    })
  }))
  let daysAway = Client.tillDeparture(departing, today)
}

// it resets the search if user not satisfied with the outcome
const resetForm = (event) => {
  document.getElementById('popup').remove()
  updateTrips('http://localhost:8010/all')
}

// it sends the travelTo object to the server and updates the site
// Used a full address due to dev server running on 8080
const postToServer = (event) => {
  postData('http://localhost:8010/addEntry', travelTo)
  .then(data => updateTrips('http://localhost:8010/all'))
    document.getElementById('popup').remove()
}

// posting to server function
const postData = async (url = '', data = {}) => {
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
    return newData
  } catch (error) {
      console.log('error', error)
    }
}

//removing trip
let buttonList = document.getElementsByClassName('remove')

// This function removesthe entries first on the server-side, then on client side
// I did both, because it wasn't updating with flow - it needed to be refreshed, or had to click 2 times to get it done
const removeTrip = (e) => {
  let elem = e.currentTarget
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      //remove functionality
      let i = Array.prototype.indexOf.call(buttonList, elem)
      console.log(i)
      postData('http://localhost:8010/remove', {index: i})
      elem.parentElement.parentElement.remove()

      swal("The trip has been deleted!", {
        icon: "success",
      });
    } else {
      swal("The trip is safe!");
    }
  })
}

// getting data from Server
const updateTrips = async (url = '') => {
  const request = await fetch (url)
  try {
    const allData = await request.json();
    for (let i = 0; i < allData.length; i++) {
      Client.buildTrips(allData[i], today)
    }
  }catch (error) {
    console.log('error', error)
  }
}

const additionalTrips = (e) => {
  swal("Not Implemeted Yet!");
}

const pageBody = document.getElementsByTagName('body')
pageBody.onload = updateTrips('http://localhost:8010/all')

export { submitHandler, resetForm, postToServer, removeTrip, additionalTrips }
