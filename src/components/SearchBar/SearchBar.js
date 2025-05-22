import React from "react";
import './SearchBar.css'
const SearchBar = ({placeholder ,onchange ,value}) => {
  return (
    <div className="search">
      <img
        src={require("../../images/Search.png")}
        alt="search"
        loading="lazy"
      />
      <input type="text" placeholder={placeholder} onChange={onchange} value={value}/>
    </div>
  );
};

export default SearchBar;
