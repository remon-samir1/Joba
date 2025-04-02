import React from "react";
import './SearchBar.css'
const SearchBar = ({placeholder}) => {
  return (
    <div className="search">
      <img
        src={require("../../images/Search.png")}
        alt="search"
        loading="lazy"
      />
      <input type="text" placeholder={placeholder}/>
    </div>
  );
};

export default SearchBar;
