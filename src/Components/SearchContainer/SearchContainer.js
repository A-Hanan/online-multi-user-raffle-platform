import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchContainer = ({ setSearchTerm, setSortBy }) => {
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };
  const handleSortChange = (e) => {
    e.preventDefault();
    setSortBy(e.target.value);
  };
  return (
    <div className="search__container">
      <div className="input__area">
        <SearchIcon />
        <input
          type="text"
          placeholder="search raffles by their title..."
          onChange={(e) => handleSearchChange(e)}
        />

        {/* <button>
          {width < 768 ? (
            <SearchIcon />
          ) : (
            <>
              <SearchIcon />{" "}
              <p style={{ display: "inline", color: "white" }}>Search</p>
            </>
          )}
        </button> */}
      </div>
      <div className="sorting__area">
        <h6>Sort By:</h6>
        <select
          name="sortingOptions"
          id="sortingOptions"
          onChange={(e) => handleSortChange(e)}
        >
          <option value="ascending date">ascending date</option>
          <option value="descending date">descending date</option>
          <option value="raffle price from lowest">
            raffle price from lowest
          </option>
          <option value="raffle price from highest">
            raffle price from highest
          </option>
          <option value="ascending by popularity">
            ascending by popularity
          </option>
          <option value="descending by popularity">
            descending by popularity
          </option>
        </select>
      </div>
    </div>
  );
};

export default SearchContainer;
