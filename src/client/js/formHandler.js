import swal from 'sweetalert'
import { getPlaces, darkSkyWeather, tillDeparture } from './app'

function submitHandler(event) {
  event.preventDefault()
  let destination = document.getElementById('destination').value
  let departing = document.getElementById('depart').value
  let returning = document.getElementById('return').value
  let d = new Date()
  let today = d.getFullYear() +'-'+ d.getMonth() + 1 +'-'+ d.getDate()

  Client.getPlaces(destination)
  .then((data) => {
    Client.darkSkyWeather(data.geonames[0].lat, data.geonames[0].lng)
  })

  Client.tillDeparture(departing, returning)

  console.log(departing)
  console.log(today)
}

export { submitHandler }
