

import Slider from "react-slick";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";




const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  return (
  
    <div className="container m-auto">
    <Slider {...settings} >
      <div>
      <img src="https://picsum.photos/id/100/1536/300" alt="" />
      </div>
      <div>
      <img src="https://picsum.photos/id/101/1536/300" alt="" />
      </div>
      <div>
      <img src="https://picsum.photos/id/102/1536/300" alt="" />
      </div>
      <div>
      <img src="https://picsum.photos/id/103/1536/300" alt="" />
      </div>
      <div>
      <img src="https://picsum.photos/id/104/1536/300" alt="" />
      </div>
      <div>
      <img src="https://picsum.photos/id/106/1536/300" alt="" />
      </div>
    </Slider>
  </div>
);
}

export default Banner
