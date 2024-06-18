import { useState } from "react";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import { Link } from "react-router-dom";
import Slider from "react-slick";

// eslint-disable-next-line react/prop-types
const ProductBanner = ({ products }) => {
  // eslint-disable-next-line react/prop-types
  const displayedProducts = products?.slice();

  // Function to truncate description to a maximum of 20 words
  const truncateDescription = (description, maxWords) => {
    const words = description.split(" ");
    if (words.length <= maxWords) {
      return description;
    }
    return words.slice(0, maxWords).join(" ") + "...";
  };

  // State to manage hover state
  const [hoveredProductId, setHoveredProductId] = useState(null);

  // Function to handle hover events
  const handleMouseEnter = (productId) => {
    setHoveredProductId(productId);
  };

  const handleMouseLeave = () => {
    setHoveredProductId(null);
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <Slider {...settings} className="container m-auto">
      {displayedProducts?.map((item) =>
        item.comic.status === 1 ? (
            
            <Link  key={item.comic.id}
              to={`/product/${item.comic.id}`}
              className="bg-white shadow-md  m-3  h-[556px] overflow-hidden transition-transform duration-300 transform hover:scale-105 product-item relative"
              style={{ position: "relative", overflow: "hidden" }}
              onMouseEnter={() => handleMouseEnter(item.comic.id)}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={item.imageUrl}
                alt={item.comic.name}
                className="w-full h-full object-cover object-center"
              />
              <div
                className={`overlay absolute top-0 left-0 w-full h-full bg-black opacity-0 transition-opacity duration-300 ${
                  hoveredProductId === item.comic.id ? "opacity-50" : "opacity-0"
                }`}
              >
                {/* Overlay content */}
              </div>
              {hoveredProductId === item.comic.id && (
                <div className="p-4 flex flex-col justify-center items-center absolute top-0 left-0 w-full h-full text-center text-white">
                  <h2 className="text-lg font-semibold">{item.comic.name}</h2>
                  <p className="text-sm mb-2">Tác giả: {item.comic.author}</p>
                  <p className="text-sm mb-2">
                    {truncateDescription(item.comic.description, 20)}
                  </p>
                  <div className="flex flex-wrap">
                    {item.listCategory?.map((category) => (
                      <span
                        key={category}
                        className="inline-block bg-gray-200 text-gray-800 text-xs px-2 rounded-full m-1"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Link>
          
        ) : null
      )}
    </Slider>
  );
};

export default ProductBanner;
