import './styles/styles.scss';
import './styles/section.scss';
import './styles/small.scss';

import { getPlaces, darkSkyWeather, pixabayImage, tillDeparture, countryDetails } from './js/app'
import { submitHandler, resetForm, postToServer, removeTrip, additionalTrips } from './js/formHandler'
import { createPopup, buildTrips } from './js/manipulatingDOM'

export {
  getPlaces,
  darkSkyWeather,
  submitHandler,
  pixabayImage,
  tillDeparture,
  createPopup,
  resetForm,
  countryDetails,
  buildTrips,
  postToServer,
  removeTrip,
  additionalTrips
 }
