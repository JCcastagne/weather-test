import './App.css'

const BASE_URL = 'https://api.openweathermap.org/data/2.5/onecall'
const API_KEY = '580363fa8ea6956daf32ba04f6aa5e61'

function App () {
  return (
    <div className='App'>
      <Navbar />
      <Weather />
    </div>
  )
}

function Navbar () {
  return <div className='Navbar'></div>
}

function Weather () {
  return <div className='Weather'></div>
}

export default App
