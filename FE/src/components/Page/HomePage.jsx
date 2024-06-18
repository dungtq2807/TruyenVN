import Banner from "../Header/Banner"
import ProductList from "./Product/ProductList"

import ProductNew from "./Product/ProductNew"
import ProductOriginals from "./Product/ProductOriginals"

const HomePage = () => {
  return (
    <div>
    <Banner/>
    <div className="py-[50px] container mx-auto">
    <ProductNew className=""/>
    <hr className="my-11"/>
    <ProductOriginals className=""/>
    <hr className="my-11"/>
    <ProductList/>
    </div>
    
    </div>
  )
}

export default HomePage
