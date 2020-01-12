import swal from 'sweetalert'
import getPlaces from './app'

function submitHandler(event) {
  let destination = document.getElementById('destination').value
  let departing = document.getElementById('depart').value
  let returning = document.getElementById('return').value
  let d = new Date()
  let today = d.getFullYear() +'-'+ d.getMonth() + 1 +'-'+ d.getDate()

  Client.getPlaces(destination)

  Client.tillDeparture(departing, returning)

  console.log(departing)
  console.log(today)
}

export { submitHandler }
