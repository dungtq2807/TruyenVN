import { Route, Routes } from "react-router-dom";

import HomePage from "./components/Page/HomePage";


import { Toaster } from "sonner";
import ProductList from "./components/Admin/Product/ProductList";
import ProductAdd from "./components/Admin/Product/ProductAdd";
import ProductEdit from "./components/Admin/Product/ProductEdit";
import LayOutHome from "./components/LayOut/LayOutHomePage";

import LayOutAdmin from "./components/LayOut/LayOutAdmin";

function App() {
  return (
    <>
      <Toaster
        richColors
        position="top-right"
        duration={2000}
        visibleToasts={3}
        expand={true}
      />
      <Routes>
        <Route path="/" element={<LayOutHome/>}>
          <Route index element={<HomePage />} />
        </Route>

        <Route path="/admin" element={<LayOutAdmin/>}>
        <Route path="product">
          <Route index element={<ProductList/>}/>
          <Route path="add" element={<ProductAdd/>}/>
          <Route path="edit/:id" element={<ProductEdit/>}/>
        </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
