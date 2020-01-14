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
      swal("Oops!", "The place does not exist!", "warning")
    }else {
      return data.geonames[0]
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
  if(daysDifference < 0) {
    swal('Hey!', 'You have missed the trip!', 'warning')
  }else if(daysDifference === 0) {
    swal('Hey!', 'Your trip starts today!', 'warning')
  }else {
    return daysDifference
  }
}

// Getting weather for entered date (Time machine request)
const darkSkyWeather = async(lat, lng, time) => {
  const res = await fetch (darkskyUrl+darkskyApiKey+lat+','+lng+','+time)
  try {
    const data = await res.json()
    return data.daily.data[0]
  }catch (error) {
    console.log('error', error)
  }
}

export {
  getPlaces,
  darkSkyWeather,
  tillDeparture
 }
