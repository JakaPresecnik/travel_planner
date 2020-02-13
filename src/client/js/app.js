const geonamesUrl = 'http://api.geonames.org/searchJSON?q=' //placename can be replaced with something else if changing the app
const geonamesApiKey = '&username=jckfck'
const darkskyUrl = 'https://api.darksky.net/forecast/'
const darkskyApiKey = '3826e3455ef6a6ce57511e90006dd29c/'
const pixabayUrl = 'https://pixabay.com/api/?key='
const pixabayApiKey = '14820008-829cc6aef01ac87c9b25676f8'
const pixabayAdditonal ='&image_type=photo&orientation=horizontal'

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
    return Math.round(daysDifference)
  }
}

// Getting weather for entered date (Time machine request)
const darkSkyWeather = async(lat, lng, time) => {
  const res = await fetch (darkskyUrl+darkskyApiKey+lat+','+lng+','+time)
  try {
    const data = await res.json()
    return data.daily.data
  }catch (error) {
    console.log('error', error)
  }
}

//getting the image of the city url from pixabay
const pixabayImage = async(place) => {
  const res = await fetch (pixabayUrl+pixabayApiKey+'&q='+place)
  try {
    const data = await res.json()
    return data.hits[0].webformatURL
  }catch (error) {
    console.log('error', error)
  }
}

// getting country details from Rest country
const countryDetails = async(country) => {
  const res = await fetch ('https://restcountries.eu/rest/v2/name/' + country)
  try {
    const data = await res.json()
    const details = {
      full_name: data[0].name,
      region: data[0].region,
      subregion: data[0].subregion,
      population: data[0].population,
      capital: data[0].capital,
      flag_URL: data[0].flag,
      language: data[0].languages[0].name,
      currency: data[0].currencies[0].name
    }
    return details
  }catch (error) {
    console.log('error', error)
  }
}

export {
  getPlaces,
  darkSkyWeather,
  pixabayImage,
  tillDeparture,
  countryDetails
 }
