import './App.css'

import loader from './img/loader.png'

import { useEffect, useState } from 'react'

// Constants
const BASE_URL = 'https://api.openweathermap.org/data/2.5/onecall'
const API_KEY = '580363fa8ea6956daf32ba04f6aa5e61'
const locationParams = [
  { city: 'ottawa', lat: 45.421532, lon: -75.697189 },
  { city: 'seoul', lat: 37.566536, lon: 126.977966 },
  { city: 'tokyo', lat: 35.689487, lon: 139.691711 }
]

function App () {
  //State variables
  const [currentCity, setCurrentCity] = useState(locationParams[0])
  const [weather, setWeather] = useState(null)

  //When the currentCity is changed/selected, fetch data for new location ( fetchWeather() )
  useEffect(() => {
    fetchWeather()
  }, [currentCity])

  //Fetch weather based on the currentCity
  async function fetchWeather () {
    //Set weather to null (this not only clears data, but makes it so that the Loader displays while fetching data)
    setWeather(null)

    let url = `${BASE_URL}?lat=${currentCity.lat}&lon=${currentCity.lon}&units=metric&appid=${API_KEY}`

    fetch(url)
      .then(resp => {
        if (resp.ok) {
          return resp.json()
        } else {
          throw new Error(`Bad response: ${resp.status}`)
        }
      })
      .then(data => {
        data.daily.length = 5
        setWeather(data.daily)
      })
      .catch(err => {
        console.error(err)
      })
  }

  return (
    <div className='App'>
      <Navbar
        locations={locationParams}
        setCurrentCity={setCurrentCity}
        currentCity={currentCity}
      />
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
            <p
              key={index}
              className={props.currentCity === item ? 'active' : ''}
              onClick={() => handleClick(item)}
            >
              {item.city}
            </p>
          )
        })}
    </div>
  )
}

function Weather (props) {
  function formatDate (timestamp) {
    let dayOfWeekName = new Date(timestamp * 1000).toLocaleString('default', {
      weekday: 'short'
    })
    return dayOfWeekName
  }

  return (
    <div className='Weather'>
      {props.weather &&
        props.weather.map((item, index) => {
          if (index === 0) {
            return (
              <div key={index} id={index} className='day'>
                <p className='dayOfWeek'>Today</p>
                <div className='wrapper'>
                  <img
                    src={require(`./img/weatherIcons/${item.weather[0]['icon']}.png`)}
                    alt={item.description}
                  />
                  <div>
                    <p className='temp'>{Math.round(item.temp.max)}&deg;</p>
                    <p className='description'>{item.weather[0].main}</p>
                  </div>
                </div>
              </div>
            )
          } else {
            return (
              <div key={index} id={index} className='day'>
                <p className='dayOfWeek'>{formatDate(item.dt)}</p>
                <img
                  src={require(`./img/weatherIcons/${item.weather[0]['icon']}.png`)}
                  alt={item.description}
                />
                <p className='temp'>{Math.round(item.temp.max)}&deg;</p>
              </div>
            )
          }
        })}
      {!props.weather && <Loader />}
    </div>
  )
}

function Loader () {
  return (
    <div className='Loader'>
      <img src={loader} alt='loading' />
    </div>
  )
}

export default App
