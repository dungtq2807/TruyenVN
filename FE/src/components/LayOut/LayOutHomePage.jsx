import Footer from '../../Footer/Footer'
import Banner from '../Header/Banner'
import HeaderHomePage from '../Header/HeaderHomePage'
import { Outlet } from 'react-router-dom'

const LayOutHomePage = () => {
  return (
    <div>
    <HeaderHomePage/>
    <Banner/>
    <Outlet/>
    <Footer/>
    </div>
  )
}

export default LayOutHomePage
