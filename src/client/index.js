import './styles/styles.scss';
import './styles/section.scss';
import './styles/small.scss';

import { getPlaces, darkSkyWeather, pixabayImage, tillDeparture, countryDetails } from './js/app'
import { submitHandler, resetForm, postToServer } from './js/formHandler'
import { createPopup } from './js/manipulatingDOM'

export {
  getPlaces,
  darkSkyWeather,
  submitHandler,
  pixabayImage,
  tillDeparture,
  createPopup,
  resetForm,
  countryDetails,
  postToServer
 }
