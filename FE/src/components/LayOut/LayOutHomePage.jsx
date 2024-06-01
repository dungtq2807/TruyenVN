import Banner from '../Header/Banner'
import HeaderHomePage from '../Header/HeaderHomePage'
import { Outlet } from 'react-router-dom'

const LayOutHomePage = () => {
  return (
    <div>
    <HeaderHomePage/>
    <Banner/>
    <Outlet/>
    </div>
  )
}

export default LayOutHomePage
