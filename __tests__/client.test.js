import { submitHandler } from '../src/client/js/formHandler'
import { getPlaces, darkSkyWeather, pixabayImage } from '../src/client/js/app'

beforeEach(() => {
  fetch.resetMocks();
})

describe('Event listener function', () => {
  it('should exist', () => {
    expect(submitHandler).toBeDefined()
  })
})

describe('API calls to Geonames', () => {
  it('should be defined ', async () => {
    expect(getPlaces).toBeDefined()
  })
  it('should load data ', () => {
    fetch.mockResponse(() => getPlaces().then(res => {
      expect(res).toBeDefined()
    }))
  })
  it('should return error ', () => {
    fetch.mockReject(() => getPlaces().then(res => Promise.reject(res.errorToRaise)))
  })
})

describe('API calls to DarkSky', () => {
  it('should be defined ', async () => {
    expect(darkSkyWeather).toBeDefined()
  })
  it('should load data ', () => {
    fetch.mockResponse(() => darkSkyWeather().then(res => {
      expect(res).toBeDefined()
    }))
  })
  it('should return error ', () => {
    fetch.mockReject(() => darkSkyWeather().then(res => Promise.reject(res.errorToRaise)))
  })
})

describe('API calls to Pixabay', () => {
  it('should be defined ', async () => {
    expect(pixabayImage).toBeDefined()
  })
  it('should load data ', () => {
    fetch.mockResponse(() => pixabayImage().then(res => {
      expect(res).toBeDefined()
    }))
  })
  it('should return error ', () => {
    fetch.mockReject(() => pixabayImage().then(res => Promise.reject(res.errorToRaise)))
  })
})
