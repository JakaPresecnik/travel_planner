const geonamesUrl = 'http://api.geonames.org/postalCodeSearch?placename=' //placename can be replaced with something else if changing the app
const apiKey = '&username=jckfck'


const getPlaces = async(city) => {
  const res = await fetch (geonamesUrl+city+apiKey)
  try {
    const data = await res.json();
    console.log(data);
    return data;
  }catch (error) {
    console.log('error', error);
  }
}

export { getPlaces }
