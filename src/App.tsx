// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'
// import DataFetch from './components/data/DataFetch'
// import DataFetch2 from './components/data/DataFetch2'
import SearchData from './components/data/SearchData'
import ReactPortals from './components/main/ReactPortals'

function App() {


  return (
    <div>
      <ReactPortals />
      {/* <DataFetch /> */}
      {/* {<DataFetch2 />} */}
      <SearchData />
    </div>
  )
}

export default App
