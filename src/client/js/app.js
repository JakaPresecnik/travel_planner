const geonamesUrl = 'http://api.geonames.org/searchJSON?q=' //placename can be replaced with something else if changing the app
const apiKey = '&username=jckfck'

// Getting JSON data from geonames
const getPlaces = async(city) => {
  const res = await fetch (geonamesUrl+city+apiKey)
  try {
    const data = await res.json()
    if(data.geonames.length === 0) {
      swal("Oops", "The place does not exist!", "warning")
    }else {
//      console.log(data.geonames[0])
      return data.geonames[0]
      /* you need: - lan (data.geonames[0].lan)
                   - lng (data.geonames[0].lng)
                   - countryName (data.geonames[0].countryName)
      */
    }
  }catch (error) {
    console.log('error', error)
  }
}

// This function calculates the days left till departure/length of trip
const tillDeparture = (leavingDate, today) => {
  let date1 = new Date(today)
  let date2 = new Date(leavingDate)
  let daysDifference = (new Date(date2 - date1))/1000/60/60/24
  console.log(daysDifference)
}


export {
  getPlaces,
  tillDeparture
 }
