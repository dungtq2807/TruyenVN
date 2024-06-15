
// import Banner from '../Header/Banner'
import Footer from '../Footer/Footer'
import HeaderHomePage from '../Header/HeaderHomePage'
import { Outlet } from 'react-router-dom'

const LayOutHome = () => {
  return (
    <div>
    <HeaderHomePage/>
    <Outlet/>
    <Footer/>
    </div>
  )
}

export default LayOutHome
