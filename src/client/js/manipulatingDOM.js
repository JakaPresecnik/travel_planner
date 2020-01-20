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
        <button>Save Trip</button>
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

export { createPopup }
