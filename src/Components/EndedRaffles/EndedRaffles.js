import React, { useState, useEffect } from "react";
import "./EndedRaffles.css";
import EndedRaffle from "./EndedRaffle";
import api from "../../utils/api";

const EndedRaffles = () => {
  const [raffles, setRaffles] = useState([]);
  useEffect(() => {
    api
      .get("/raffle/endedRaffles")
      .then((res) => {
        console.log("ended raffles>>", res.data);
        setRaffles(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="ended__raffles__container">
      {raffles.length > 0 ? (
        <>
          <h3>Ended Raffles</h3>
          {raffles.map((raffle) => (
            <EndedRaffle raffle={raffle} />
          ))}
        </>
      ) : (
        <h1>No Ended Raffles</h1>
      )}
    </div>
  );
};

export default EndedRaffles;
