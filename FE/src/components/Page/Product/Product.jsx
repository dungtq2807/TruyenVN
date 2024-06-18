import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Product = ({ products }) => {
  // eslint-disable-next-line react/prop-types
  const displayedProducts = products?.slice();

  // Function to truncate description to a maximum of 20 words
  const truncateDescription = (description, maxWords) => {
    const words = description.split(' ');
    if (words.length <= maxWords) {
      return description;
    }
    return words.slice(0, maxWords).join(' ') + '...';
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {displayedProducts?.map((item) =>
        item.comic.status === 1 ? (
          <Link
            key={item.comic.id}
            to={`/product/${item.comic.id}`}
            className="bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105"
          >
            <img
              src={item.imageUrl}
              alt={item.comic.name}
              className="w-full h-48 object-cover object-center"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">{item.comic.name}</h2>
              <p className="text-sm text-gray-600 mb-2">Tác giả: {item.comic.author}</p>
              <p className="text-sm text-gray-600 mb-2">
                {truncateDescription(item.comic.description, 20)}
              </p>
              <div className="flex flex-wrap">
                {item?.listCategory?.map((category) => (
                  <span
                    key={category?.category?.id}
                    className="inline-block bg-gray-200 text-gray-800 text-xs px-2 rounded-full m-1"
                  >
                    {category?.category?.category}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ) : null
      )}
    </div>
  );
};

export default Product;
