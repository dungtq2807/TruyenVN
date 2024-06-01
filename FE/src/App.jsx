import { Route, Routes } from "react-router-dom";
import LayOutHome from "./components/Layout/LayOutHomePage";
import HomePage from "./components/Page/HomePage";

import LayOutAdmin from "./components/Layout/LayOutAdmin";
import Product from "./components/Admin/Product";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayOutHome />}>
          <Route index element={<HomePage />} />
   
        </Route>
        <Route path="admin" element={<LayOutAdmin/>}/>
        <Route path="/product" element={<Product/>}>
        </Route>
      
      </Routes>
    </>
  );
}

export default App;
