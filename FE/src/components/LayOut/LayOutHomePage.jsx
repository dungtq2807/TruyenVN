import { Outlet } from 'react-router-dom'
import HeaderHomePage from '../Header/HeaderHomePage'

const LayOutHomePage = () => {
  return (
    <div>
    <HeaderHomePage/>
      <Outlet/>
    </div>
  )
}

export default LayOutHomePage
