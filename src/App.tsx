// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'
// import DataFetch from './components/data/DataFetch'
// import DataFetch2 from './components/data/DataFetch2'
// import DataFetch3 from './components/data/DataFetch3'
// import SearchData from './components/data/SearchData'
// import UseRef from './components/data/UseRef'
// import DataFetchAxios from './components/data/DataFetchAxios'
import DataPaginated from './components/data/DataPaginated'
import ReactPortals from './components/main/ReactPortals'

function App() {


  return (
    <div>
      <ReactPortals />
      {/* <DataFetch /> */}
      {/* {<DataFetch2 />} */}
      {/* <SearchData /> */}
      {/* <DataFetch3 /> */}
      {/* <UseRef /> */}
      {/* <DataFetchAxios /> */}
      <DataPaginated />
    </div>
  )
}

export default App
