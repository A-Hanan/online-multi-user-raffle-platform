import React, { useState, useEffect } from "react";
import "./LiveRaffles.css";
import PendingRaffle from "../PendingRaffles/PendingRaffle";
import api from "../../utils/api";
import Loading from "../Loading/Loading";

function LiveRaffles() {
  const [raffles, setRaffles] = useState([]);
  console.log("live raffles>", raffles);
  useEffect(() => {
    api
      .get("/raffle/liveRaffles")
      .then((res) => {
        console.log("res from fetching live raf", res.data);
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
          <h3>Live Raffles</h3>
          {raffles.map((raffle) => (
            <PendingRaffle raffle={raffle} />
          ))}
        </>
      ) : (
        <h1>No Live Raffles</h1>
      )}
      {/* <PendingRaffle raffle={raffles[0]} />
      <PendingRaffle raffle={raffles[0]} />
      <PendingRaffle raffle={raffles[0]} /> */}
    </div>
  );
}

export default LiveRaffles;
