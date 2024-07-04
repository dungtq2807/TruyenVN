import { Link } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import Category from "../Page/Category/Category";
import UserProfile from "../Page/UserProfile/UserProfile";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../conf/axiosInstance";
import { useState } from "react";
import Autosuggest from "react-autosuggest";

const HeaderHomePage = () => {
  const { isLoggedIn } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const { data: productsData, isLoading: isProductsLoading, error: productsError } = useQuery({
    queryKey: ["PRODUCT"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/api/v1/comic_detail/getAll");
      return data;
    },
  });

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0
      ? []
      : productsData.filter(
          (product) =>
            product.comic.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const handleSearchInputChange = (event, { newValue }) => {
    setSearchQuery(newValue);
  };

  const handleSearch = () => {
    const filtered = getSuggestions(searchQuery);
    setSuggestions(filtered);
    setShowResults(true);
  };

  const handleLinkClick = () => {
    setShowResults(false);
    setSearchQuery("");
  };

  const renderSuggestion = (suggestion) => (
    <Link
      to={`/detail/${suggestion.comic.id}`}
      className="block py-2 px-4 hover:bg-gray-200 rounded-md"
      onClick={handleLinkClick}
    >
      {suggestion.comic.name}
    </Link>
  );

  const inputProps = {
    placeholder: "Tìm kiếm",
    value: searchQuery,
    onChange: handleSearchInputChange,
    onKeyPress: (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    className: "input input-bordered w-full md:w-64 rounded-md",
  };

  return (
    <div className="m-auto container">
      <div className="navbar bg-base-100 flex items-center justify-between py-4">
        <div className="flex items-center space-x-4">
          <Link to="/" className="btn btn-ghost text-xl">
            COMIC
          </Link>
          <Category />
        </div>

        <div className="flex items-center space-x-4 relative">
          <div className="form-control  ">
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={({ value }) => {
                setSuggestions(getSuggestions(value));
              }}
              onSuggestionsClearRequested={() => {
                setSuggestions([]);
              }}
              getSuggestionValue={(suggestion) => suggestion.comic.name}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
            />
          </div>
          {showResults && suggestions.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.comic.id}
                  className="block py-2 px-4 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLinkClick}
                >
                  {renderSuggestion(suggestion)}
                </div>
              ))}
            </div>
          )}

          {isLoggedIn ? (
            <UserProfile />
          ) : (
            <Link to="/signin" className="btn btn-primary">
              Đăng nhập
            </Link>
          )}
        </div>
      </div>

      {isProductsLoading && <p>Loading...</p>}
      {productsError && <p>Error loading data</p>}
    </div>
  );
};

export default HeaderHomePage;
