import tillDeparture from './app'

// The name of the file says it all
const createPopup = (submitObject, daysLeft) => {
  const popupObject = document.getElementById('trips')
  popupObject.innerHTML = `
    <div id="popup">
      <img src="${submitObject.image}" alt="Picture of ${submitObject.city}">
      <div class="header-saved-trip">
        <p>Travel to: ${submitObject.city}, ${submitObject.country}</p>
        <p>On ${submitObject.leaveDate} ?</p>
      </div>
      <div class="buttons">
        <button onclick="return Client.postToServer(event)">Save Trip</button>
        <button onclick="return Client.resetForm(event)">Reset Submission</button>
      </div>
      <div class="days-away">
        <p>Trip is <strong>${daysLeft}</strong> days away.</p>
      </div>
      <div class="trip-weather">
        <p>Typical weather for then is:</p>
        <p><em>High temperature: ${submitObject.tempHigh} &#176;C, Low temperature: ${submitObject.tempLow} &#176;C <br>
        ${submitObject.weather}</em></p>
      </div>
    </div>
    `
  return popupObject.innerHTML
}

const buildTrips = (savedObject, dayToday) => {
  const daysAway = Client.tillDeparture(savedObject.leaveDate, dayToday)
  const daysLasts = Client.tillDeparture(savedObject.returnDate, savedObject.leaveDate)
  const savedTrips = document.getElementById('trips')
  savedTrips.innerHTML += `
  <div class="saved">
    <img src="${savedObject.image}" alt="${savedObject.country}">
    <div class="header-saved-trip" style="background-image: url('${savedObject.details.flag_URL}')">
      <p>My trip to: ${savedObject.city}, ${savedObject.country}</p>
      <p>Departing: ${savedObject.leaveDate}</p>
      <p>Returning: ${savedObject.returnDate}</p>
    </div>
    <div class="buttons">
      <button class="remove" onclick="return Client.removeTrip(event)" >remove trip</button>
    </div>
    <div class="days-away">
      <p>Trip is ${daysAway} days away</p>
      <p>You are staying there ${daysLasts} days</p>
    </div>
    <div class="trip-weather">
      <p>Typical weather for then is: <button class="details_btn" onclick= "return Client.weatherDetails(event)"><i class="fa fa-caret-down" aria-hidden="true"></i></button><img class="wthicon" src="${savedObject.weatherIcon}" alt=""></p>
      <p><em>High temperature: ${savedObject.tempHigh} &#176;C, Low temperature: ${savedObject.tempLow} &#176;C <br>
      ${savedObject.weather}</em></p>
    </div>
    <div class="details">
      <p><strong>${savedObject.details.full_name}</strong> is located in ${savedObject.details.region}, more specifically ${savedObject.details.subregion}, with a population of ${savedObject.details.population}. Its capital is ${savedObject.details.capital}, language is ${savedObject.details.language} and currency used in the country is ${savedObject.details.currency}.</p>
    </div>

  `
}

export { createPopup, buildTrips }
