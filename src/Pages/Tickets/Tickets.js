import React, { useState, useEffect } from "react";
import "./Tickets.css";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/api";
import Ticket from "./Ticket";

const Tickets = () => {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const [myTickets, setMyTickets] = useState([]);

  useEffect(() => {
    api
      .get("/ticket/user-tickets")
      .then((res) => {
        console.log(res.data);
        let temp = res.data.filter((t) => !t.isRaffleEnded);
        setMyTickets(temp);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="tickets__page">
      <h1>My Tickets</h1>
      <div className="tickets__container">
        {myTickets.map((ticket) => (
          <Ticket data={ticket} />
        ))}
      </div>
    </div>
  );
};

export default Tickets;
