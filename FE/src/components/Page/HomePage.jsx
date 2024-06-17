import Banner from "../Header/Banner"

import ProductNew from "./Product/ProductNew"
import ProductOriginals from "./Product/ProductOriginals"

const HomePage = () => {
  return (
    <div>
    <Banner/>
    <div className="py-[50px] container mx-auto">
    <ProductNew/>
    <ProductOriginals/>
    </div>
    
    </div>
  )
}

export default HomePage
