import { Outlet } from "react-router-dom"

const LayOutComic = () => {
  return (
    <div  className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
    
    <Outlet/>
    </div>
  )
}

export default LayOutComic