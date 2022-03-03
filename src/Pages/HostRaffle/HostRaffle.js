import React, { useState, useEffect } from "react";
import "./HostRaffle.css";
import Dashboard from "../../Components/Dashboard/Dashboard2";
import HostRaffleForm from "../../Components/HostRaffleForm/HostRaffleForm";
import api from "../../utils/api";
import { useParams } from "react-router-dom";
import LiveRaffles from "../../Components/LiveRaffles/LiveRaffles";
import EndedRaffles from "../../Components/EndedRaffles/EndedRaffles";
import PendingRaffles from "../../Components/PendingRaffles/PendingRaffles";
import EditRaffle from "../../Components/EditRaffle/EditRaffle";
import Loading from "../../Components/Loading/Loading";

const HostRaffle = () => {
  const { subCategory } = useParams();
  const [active, setActive] = useState("info");
  const [loading, showLoading] = useState(true);

  useEffect(() => {
    if (subCategory) {
      console.log("subcategory>>> ", subCategory);
      setActive(subCategory);
    } else {
      setActive("info");
    }
    setTimeout(() => {
      console.log("subCategory>", active);
    }, 2000);
  }, [window.location.pathname]);

  return (
    <div className="host__raffle">
      <Dashboard setActive={setActive} active={active} />
      {active === "info" && (
        <div className="host__raffle__info">
          <h1>Host Raffles</h1>
          <p>
            You have something you’d like to raffle on our platform? That’s
            great!
            <br />
            <br />
            On IALT you can host your own competitions and start selling raffle
            tickets publicly or privately with the option to keep the proceeds
            from ticket sales yourself or to donate all or part of them to a
            registered charity of your choice.
            <br />
            <br />
            As a host you decide the price per ticket and how many tickets you
            wish to issue and within minutes you’re ready to go!
            <br />
          </p>
          <button onClick={() => setActive("create")}>Host a Raffle</button>
        </div>
      )}

      {active == "create" ? (
        <HostRaffleForm />
      ) : active == "live" ? (
        <LiveRaffles />
      ) : active == "pending" ? (
        <PendingRaffles />
      ) : active == "ended" ? (
        <EndedRaffles />
      ) : active == "edit" ? (
        <EditRaffle />
      ) : (
        <></>
      )}
    </div>
  );
};

export default HostRaffle;
