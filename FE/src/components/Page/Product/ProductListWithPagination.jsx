import { useState } from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProductListWithPagination = ({ products }) => {
  const itemsPerPage = 6; // Number of items to display per page (2 columns x 3 rows)
  const [currentPage, setCurrentPage] = useState(1);

  // Function to truncate description to a maximum of 20 words
  const truncateDescription = (description, maxWords) => {
    const words = description.split(' ');
    if (words.length <= maxWords) {
      return description;
    }
    return words.slice(0, maxWords).join(' ') + '...';
  };

  // Calculate total number of pages
  // eslint-disable-next-line react/prop-types
  const totalPages = Math.ceil(products?.length / itemsPerPage);

  // Determine which products to display based on current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // eslint-disable-next-line react/prop-types
  const displayedProducts = products?.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 gap-6">
        {displayedProducts?.map((item) =>
          item.comic.status === 1 ? (
            <div key={item.comic.id} className="py-4">
              <Link
                to={`/detail/${item.comic.id}`}
                className="flex space-x-4 items-center hover:bg-gray-100 p-4 transition duration-300 ease-in-out"
              >
                <img
                  src={item.imageUrl}
                  alt={item.comic.name}
                  className="w-24 h-24 object-cover object-center rounded-lg"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-800">{item.comic.name}</h2>
                  <div className="flex flex-wrap">
                  {item.listCategory?.map((category) => (
                    <span
                      key={category.category.id}
                      className="inline-block bg-gray-200 text-gray-800 text-xs px-2 rounded-full m-1"
                    >
                      {category.category.category}
                    </span>
                  ))}
                </div>
                  <p className="text-sm text-gray-600 mb-2">Tác giả: {item.comic.author}</p>
                  <p className="text-sm text-gray-600 mb-2">
                    {truncateDescription(item.comic.description, 20)}
                  </p>
                
                </div>
              </Link>
            </div>
          ) : null
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 mx-1 text-sm rounded-md focus:outline-none ${
              currentPage === index + 1 ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
            } hover:bg-gray-300`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductListWithPagination;
