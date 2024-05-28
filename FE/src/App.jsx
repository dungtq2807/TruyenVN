import { Route, Routes } from "react-router-dom"
import LayOutHome from "./components/Layout/LayOutHomePage"
import HomePage from "./components/Page/HomePage"




function App() {


  return (
    <>
  <Routes>
    <Route path="/" element={<LayOutHome/>}>
    <Route index element={<HomePage/>}/>
    </Route>
  </Routes>
    </>
  )
}

export default App
