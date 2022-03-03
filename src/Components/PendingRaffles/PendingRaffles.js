import React, { useState, useEffect } from "react";
import "./PendingRaffles.css";
import PendingRaffle from "./PendingRaffle";
import api from "../../utils/api";

const PendingRaffles = () => {
  const [raffles, setRaffles] = useState([]);
  useEffect(() => {
    console.log("running that useeffect");
    api
      .get("/raffle/pendingRaffles")
      .then((res) => {
        console.log("res from fetching pend raf", res.data);
        setRaffles(res.data);
      })
      .catch((err) => {
        console.log("failed", err);
      });
  }, []);

  return (
    <div className="pending__raffles__container">
      {raffles.length > 0 ? (
        <>
          <h3>Pending Raffles</h3>
          {raffles.map((raffle) => (
            <PendingRaffle raffle={raffle} />
          ))}
        </>
      ) : (
        <h1>No Pending Raffles</h1>
      )}
      {/* <PendingRaffle raffle={raffles[0]} />
      <PendingRaffle raffle={raffles[0]} />
      <PendingRaffle raffle={raffles[0]} /> */}
    </div>
  );
};

export default PendingRaffles;
