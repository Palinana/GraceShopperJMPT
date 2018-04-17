import React from 'react'

import {Navbar, Trips} from './components'
import Routes from './routes'


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <Trips />
    </div>
  )
}
//will integrate our navbar and sidebar

export default App
