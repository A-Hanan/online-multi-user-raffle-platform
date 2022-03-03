import React, { useState } from "react";
import "./SearchRaffle.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import SearchContainer from "../../Components/SearchContainer/SearchContainer";
import RaffleItems from "../../Components/RaffleItems/RaffleItems";
import CategoryBar from "../../Components/CategoryBar/CategoryBar";

const SearchRaffle = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [category,setCategory]=useState("");
  return (
    <>
      <div className="search__raffles">
        <CategoryBar setCategory={setCategory}/>
        <SearchContainer setSearchTerm={setSearchTerm} setSortBy={setSortBy} />

        <RaffleItems searchTerm={searchTerm} sortBy={sortBy} category={category} />
      </div>
      <Footer />
    </>
  );
};

export default SearchRaffle;
