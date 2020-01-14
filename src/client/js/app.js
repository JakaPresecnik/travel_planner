const geonamesUrl = 'http://api.geonames.org/searchJSON?q=' //placename can be replaced with something else if changing the app
const geonamesApiKey = '&username=jckfck'
const darkskyUrl = 'https://api.darksky.net/forecast/'
const darkskyApiKey = '3826e3455ef6a6ce57511e90006dd29c/'

// Getting JSON data from geonames
const getPlaces = async(city) => {
  const res = await fetch (geonamesUrl+city+geonamesApiKey)
  try {
    const data = await res.json()
    if(data.geonames.length === 0) {
      swal("Oops", "The place does not exist!", "warning")
    }else {
/**///      console.log(data.geonames[0].countryName + ', ' + data.geonames[0].lat + ', ' + data.geonames[0].lng)
      return data
      /* you need: - lan (data.geonames[0].lat)
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
/**/  console.log(daysDifference)
}

// Getting weather for entered date (Time machine request)
const darkSkyWeather = async(lat, lng) => {
  const res = await fetch (darkskyUrl+darkskyApiKey+lat+','+lng)
  try {
    const data = await res.json()
/**/    console.log(data)
    return data
  }catch (error) {
    console.log('error', error)
  }
}

export {
  getPlaces,
  darkSkyWeather,
  tillDeparture
 }
