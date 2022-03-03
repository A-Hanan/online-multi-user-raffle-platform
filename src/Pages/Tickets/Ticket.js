import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

const Ticket = ({ data }) => {
  const raffle = data?.raffle;
  const navigate = useNavigate();

  const visitRaffle = (e) => {
    e.preventDefault();
    navigate(`/enter-raffle/${raffle?._id}`);
  };
  return (
    <div className="ticket">
      <h6 className="ticket__number">ID : {data?._id}</h6>
      <h6 className="prize__label">Prize to win</h6>

      <div className="prize__image">
        <img src={raffle?.image} />
      </div>
      <h6 className="prize__title">{raffle?.title}</h6>

      <button onClick={(e) => visitRaffle(e)} className="visit__raffle__btn">
        visit raffle
      </button>
    </div>
  );
};

export default Ticket;
