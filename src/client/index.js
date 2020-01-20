import './styles/styles.scss';
import './styles/section.scss';
import './styles/small.scss';

import { getPlaces, darkSkyWeather, pixabayImage, tillDeparture } from './js/app'
import { submitHandler, resetForm } from './js/formHandler'
import { createPopup } from './js/manipulatingDOM'

export {
  getPlaces,
  darkSkyWeather,
  submitHandler,
  pixabayImage,
  tillDeparture,
  createPopup,
  resetForm
 }
