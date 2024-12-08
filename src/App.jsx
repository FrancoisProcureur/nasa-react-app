import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Main from "./components/main"
import Sidebar from "./components/Sidebar"

function App() {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  function handleToggleModal(){
    setShowModal(!showModal)
  }

  useEffect(() =>{
    async function  fecthAPIData() {
      const NASA_KEY =  import.meta.env.VITE_NASA_API_KEY
      const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_KEY}`
      const today = (new Date()).toDateString()
      const localKey = `NASA-${today}`
      if (localStorage.getItem(localKey)){
        const apiDATA = JSON.parse(localStorage.getItem(localKey))
        setData(apiDATA)
        console.log("fetched from cache")
        return
      }
      localStorage.clear()
      
      try{
        const res = await fetch(url)
        const apiData = await res.json()
        localStorage.setItem(localKey, JSON.stringify(apiData))
        setData(apiData)
        console.log("fetched from api")
        console.log(`DATA\n`, apiData)
      } catch(err){
        console.log(err.message)
      }
    }
      fecthAPIData()
  },[])

  return (
  <>
    {data ? (<Main data={data} />) : (
      <div className="loadingState">
        <i className="fa-solid fa-gear"></i>
      </div>
    )}
    {showModal && 
    (<Sidebar data={data} handleToggleModal={handleToggleModal}/>)} 
    {data && (<Footer data={data} handleToggleModal={handleToggleModal} />)
    }
  </>
  )
}

export default App
