import { useEffect, useState } from 'react'
import './App.css'

const BASE_URL = 'https://api.openweathermap.org/data/2.5/onecall'
const API_KEY = '580363fa8ea6956daf32ba04f6aa5e61'

const locationParams = [
  { city: 'ottawa', lat: 45.421532, lon: -75.697189 },
  { city: 'seoul', lat: 37.566536, lon: 126.977966 },
  { city: 'tokyo', lat: 35.689487, lon: 139.691711 }
]

function App () {
  const [currentCity, setCurrentCity] = useState(locationParams[0])
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    fetchWeather()
  }, [currentCity])

  useEffect(() => {
    console.log(currentCity)
  }, [currentCity])

  async function fetchWeather () {
    let url = `${BASE_URL}?lat=${currentCity.lat}&lon=${currentCity.lon}&units=metric&appid=${API_KEY}`

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
        console.table(data.daily)
        data.daily.length = 5
        setWeather(data.daily)
      })
      .catch(err => {
        console.error(err)
      })
  }

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
  function formatDate (timestamp) {
    let dayOfWeekName = new Date(timestamp * 1000).toLocaleString('default', {
      weekday: 'long'
    })

    if (Date.now() > timestamp * 1000) {
      dayOfWeekName = 'Today'
    }

    return dayOfWeekName
  }

  return (
    <div className='Weather'>
      {props.weather &&
        props.weather.map((item, index) => {
          if (index === 0) {
            return (
              <div key={index} id={index} className='day'>
                <p className='dayOfWeek'>{formatDate(item.dt)}</p>
                <div className='wrapper'>
                  <img
                    src={require(`./img/weatherIcons/${item.weather[0]['icon']}.png`)}
                    alt={item.description}
                  />
                  <div>
                    <p className='temp'>{Math.round(item.temp.max)}&deg;C</p>
                    <p className='description'>{item.weather[0].main}</p>
                  </div>
                </div>
              </div>
            )
          } else {
            return (
              <div key={index} id={index} className='day'>
                <p className='dayOfWeek'>{formatDate(item.dt)}</p>
                <p className='temp'>{Math.round(item.temp.max)}&deg;C</p>
                <img
                  src={require(`./img/weatherIcons/${item.weather[0]['icon']}.png`)}
                  alt={item.description}
                />
              </div>
            )
          }
        })}
    </div>
  )
}

export default App
