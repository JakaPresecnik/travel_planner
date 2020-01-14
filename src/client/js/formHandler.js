import swal from 'sweetalert'
import { getPlaces, darkSkyWeather, tillDeparture } from './app'

function submitHandler(event) {
  event.preventDefault()
  let destination = document.getElementById('destination').value
  let departing = document.getElementById('depart').value
  let returning = document.getElementById('return').value
  //converting leaving date to UNIX time - for darkSkyWeb
  let leaveDate = Date.parse(departing)/1000

  let d = new Date()
  let today = d.getFullYear() +'-'+ d.getMonth() + 1 +'-'+ d.getDate()

  Client.getPlaces(destination)
  .then((data) => {
    console.log(data)
    Client.darkSkyWeather(data.lat, data.lng, leaveDate)
    .then((data) => {
      console.log(data)
    })
  })

  Client.tillDeparture(departing, today)

  console.log(departing)
  console.log(today)
}

export { submitHandler }
