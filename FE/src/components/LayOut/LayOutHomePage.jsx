import HeaderHomePage from '../Header/HeaderHomePage'
import { Outlet } from 'react-router-dom'

const LayOutHomePage = () => {
  return (
    <div>
    <HeaderHomePage/>
    <Outlet/>
    </div>
  )
}

export default LayOutHomePage
