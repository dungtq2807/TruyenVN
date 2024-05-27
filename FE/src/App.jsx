import { Route, Routes } from 'react-router-dom';
import LayOutHomePage from './components/LayOut/LayOutHomePage';
import '../src/App.css'
function App() {


  return (
    <>
     <Routes>
     
      <Route path='/' element={<LayOutHomePage/>}>
      <Route index element={<>hhhh</>}/>
      </Route>

     </Routes>
    </>
  )
}

export default App
