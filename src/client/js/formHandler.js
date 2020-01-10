import swal from 'sweetalert'

const geonamesUrl = 'http://api.geonames.org/searchJSON?q=' //placename can be replaced with something else if changing the app
const apiKey = '&isNameRequired=true&username=jckfck'

function submitHandler(event) {
  let destination = document.getElementById('destination').value
  let departing = document.getElementById('depart').value
  let returning = document.getElementById('return').value

  getPlaces(destination)

  console.log(destination)
}

const getPlaces = async(city) => {
  const res = await fetch (geonamesUrl+city+apiKey)
  try {
    const data = await res.json();
    if(data.geonames.length === 0) {
      swal("Oops", "The place does not exist!", "warning")
    }else {
      console.log(data.geonames[0]);
      return data;
    }

  }catch (error) {
    console.log('error', error);
  }
}

export { submitHandler }
