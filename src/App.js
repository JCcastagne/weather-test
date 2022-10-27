import { useEffect, useState } from 'react'
import './App.css'

const BASE_URL = 'https://api.openweathermap.org/data/2.5/onecall'
const API_KEY = '580363fa8ea6956daf32ba04f6aa5e61'

const locationParams = [
  { city: 'ottawa', lat: 45.421532, lon: -75.697189 },
  { city: 'seoul', lat: 37.566536, lon: 126.977966 },
  { city: 'tokyo', lat: 35.689487, lon: 139.691711 }
]

/**
 * Fetch location's weather data.
 * @param {Object} location - the location object.
 * @param {Object} location.lat - the latitude corresponding to the location.
 * @param {Object} location.lon - the longitude corresponding to the location.
 * @returns {Object} data - object received from our fetch call that contains all weather info related to the location passed.
 */
async function fetchWeather (location) {
  let url = `${BASE_URL}?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API_KEY}`

  fetch(url)
    .then(resp => {
      if (resp.ok) {
        console.log('good response')
        return resp.json()
      } else {
        console.log('bad response', resp.status)
        throw new Error('BAD RESPONSE')
      }
    })
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.error(err)
    })
}

function App () {
  const [currentCity, setCurrentCity] = useState(locationParams[0])
  const [weather, setWeather] = useState(null)

  // useEffect(() => {
  //   fetchWeather(locationParams.ottawa)
  // }, [])

  useEffect(() => {
    console.log(currentCity)
  }, [currentCity])

  return (
    <div className='App'>
      <Navbar locations={locationParams} setCurrentCity={setCurrentCity} />
      <Weather weather={weather} />
    </div>
  )
}

function Navbar (props) {
  function handleClick (item) {
    props.setCurrentCity(item)
  }

  return (
    <div className='Navbar'>
      {props &&
        props.locations.map((item, index) => {
          return (
            <p key={index} onClick={() => handleClick(item)}>
              {item.city}
            </p>
          )
        })}
    </div>
  )
}

function Weather (props) {
  return <div className='Weather'></div>
}

export default App
