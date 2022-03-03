import React, { useState, useEffect } from "react";
import RaffleItem from "./RaffleItem";
import ReactPaginate from "react-paginate";
import api from "../../utils/api";

function Items({ currentItems, category }) {
  return (
    <>
      <h1
        style={{
          textAlign: "center",
          padding: "0px",
          marginTop: "30px",
          fontWeight: "bold",
          fontSize: "2.2rem",
          textTransform: "uppercase",
          wordSpacing: "10px",
        }}
      >
        {category === "" ? "Featured" : category}
      </h1>
      <div className="raffle__items">
        {currentItems &&
          currentItems.map((item) => <RaffleItem raffle={item} />)}
      </div>
    </>
  );
}

const RaffleItems = ({ searchTerm, sortBy, category }) => {
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [allLiveRaffles, setAllLiveRaffles] = useState([]);
  const [allRaffles, setAllRaffles] = useState([]);
  const [refreshor, setRefreshor] = useState(0);
  useEffect(() => {
    setAllLiveRaffles(
      allRaffles.filter((raffle) => {
        return raffle.title.toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
    setItemOffset(0);
  }, [searchTerm]);

  useEffect(() => {
    console.log("category>> ", category);
    setAllLiveRaffles(
      allRaffles.filter((raffle) => {
        return raffle.category.toLowerCase().includes(category.toLowerCase());
      })
    );
    setItemOffset(0);
  }, [category]);

  useEffect(() => {
    console.log("sort By>>> ", sortBy);
    if (sortBy === "descending date") {
      let temp = allLiveRaffles.sort(function (a, b) {
        return new Date(b.expiryDate) - new Date(a.expiryDate);
      });
      setAllLiveRaffles(temp);
    } else if (sortBy === "ascending date") {
      let temp = allLiveRaffles.sort(function (a, b) {
        return new Date(a.expiryDate) - new Date(b.expiryDate);
      });
      setAllLiveRaffles(temp);
    } else if (sortBy === "raffle price from lowest") {
      let temp = allLiveRaffles.sort(function (a, b) {
        return a.pricePerTicket - b.pricePerTicket;
      });
      setAllLiveRaffles(temp);
    } else if (sortBy === "raffle price from highest") {
      let temp = allLiveRaffles.sort(function (a, b) {
        return b.pricePerTicket - a.pricePerTicket;
      });
      setAllLiveRaffles(temp);
    } else if (sortBy === "ascending by popularity") {
      let temp = allLiveRaffles.sort(function (a, b) {
        return a.ticketsSold - b.ticketsSold;
      });
      console.log("raffles after sorting", temp);
      setAllLiveRaffles(temp);
    } else if (sortBy === "descending by popularity") {
      console.log("descending by popularity");
      let temp = allLiveRaffles.sort(function (a, b) {
        return b.ticketsSold - a.ticketsSold;
      });
      console.log("raffles after sorting", temp);
      setAllLiveRaffles(temp);
    }
    setRefreshor(Math.floor(Math.random() * 1000));
    setItemOffset(0);
  }, [sortBy]);

  useEffect(() => {
    api
      .get("/raffle/all-live-raffles")
      .then((res) => {
        console.log("all live raffles at raffleItems.js> ", res.data);

        var temp = res.data;
        var array = res.data;
        var n = array.length;
        var j = 0;
        for (var i = 0; i < 4; i++) {
          if (j === n) {
            i = 0;
          }
          array.push(temp[j]);
          j++;
        }

        let tempRaffles = array.sort(function (a, b) {
          return new Date(a.expiryDate) - new Date(b.expiryDate);
        });
        setAllLiveRaffles(tempRaffles);
        setAllRaffles(array);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [itemOffset, setItemOffset] = useState(0);
  useEffect(() => {
    width < 768 ? setItemsPerPage(18) : setItemsPerPage(36);
  }, []);
  useEffect(() => {
    console.log("change in all live raffles");

    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(allLiveRaffles.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(allLiveRaffles.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, allLiveRaffles, refreshor]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % allLiveRaffles.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} category={category} />
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default RaffleItems;
