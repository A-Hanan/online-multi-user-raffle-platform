import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./EnterRaffle.css";
import RaffleEndCountdown from "../../Components/RaffleEndCountdown/RaffleEndCountdown";
import Avatar from "@mui/material/Avatar";
import api from "../../utils/api";
import PurchaseTicketModel from "../PaymentPage/PaymentPage";
import Trophy from "../../assets/images/trophy.jpg";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const EnterRaffle = () => {
  const { raffleId } = useParams();
  const [raffle, setRaffle] = useState({});
  const [host, setHost] = useState({});
  const [showPurchaseModel, setShowPurchaseModel] = useState(false);
  const [winner, setWinner] = useState({});
  console.log("raffleId>>> ", raffleId);
  useEffect(() => {
    api
      .get(`/raffle/getById/${raffleId}`)
      .then((res) => {
        setRaffle(res.data);
        var { hostId } = res.data;
        api
          .get(`/user/getUserById/${hostId}`)
          .then((res) => setHost(res.data))
          .catch((err) => console.log("error while fetching host", err));
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    if (raffle && raffle?.status === "Ended") {
      console.log("winning ticket id>", raffle?.winnerTicketId);
      api
        .get(`/winner/byTicketId/${raffle?.winnerTicketId}`)
        .then((res) => {
          console.log("winner>", res.data);
          setWinner(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [raffle]);
  return (
    <div className="enter__raffle">
      {raffle?.status === "Live" ? (
        <>
          {raffle?.expiryDate && (
            <RaffleEndCountdown EndTime={raffle?.expiryDate} />
          )}

          <div className="enter__raffle__info__container">
            <div className="enter__raffle__image__box">
              <img
                className="enter__raffle__image"
                src={raffle?.image}
                alt=""
              />
            </div>
            <h1 className="enter__raffle__title">{raffle?.title}</h1>
          </div>
          <div className="enter__raffle__host__info">
            <h1>Hosted By </h1>
            <Avatar className="host__avatar">
              {host?.name && host?.name[0]}
            </Avatar>
            <div className="enter__raffle__host__name__location">
              <h1>{host?.name}</h1>
              <h3>Pakistan</h3>
            </div>
          </div>
          <div className="enter__raffle__description">
            <h1>Description</h1>
            <p>{raffle?.description}</p>
          </div>
          <div className="enter__raffle__ticket__info__container">
            <div>
              <h6>{raffle?.pricePerTicket}$</h6>
              <p>per ticket</p>
            </div>
            <div>
              <h6>{raffle?.totalTickets} </h6>
              <p>paid tickets</p>
            </div>
            <div>
              <h6>{raffle?.totalTickets - raffle?.ticketsSold}</h6>
              <p>tickets remaining</p>
            </div>
          </div>
          <div className="enter__raffle__end__info">
            <p>Raffle Ends on {new Date(raffle?.expiryDate).toDateString()}</p>
          </div>

          <button
            onClick={() => setShowPurchaseModel(true)}
            className="enter__raffle__button"
          >
            ENTER RAFFLE
          </button>

          {showPurchaseModel && raffle && (
            <PurchaseTicketModel
              raffle={raffle}
              setShowPurchaseModel={setShowPurchaseModel}
            />
          )}
        </>
      ) : (
        <>
          <h1>Raffle Ended</h1>
          <div className="enter__raffle__info__container">
            <div className="enter__raffle__image__box">
              <img
                className="enter__raffle__image"
                src={raffle?.image}
                alt=""
              />
            </div>
            <h1 className="enter__raffle__title">{raffle?.title}</h1>
          </div>
          <div className="enter__raffle__host__info">
            <h1>Hosted By </h1>
            <Avatar className="host__avatar">
              {host?.name && host?.name[0]}
            </Avatar>
            <div className="enter__raffle__host__name__location">
              <h1>{host?.name}</h1>
              <h3>Pakistan</h3>
            </div>
          </div>
          <div className="enter__raffle__description">
            <h1>Description</h1>
            <p>{raffle?.description}</p>
          </div>
          <div className="enter__raffle__ticket__info__container">
            <div>
              <h6>{raffle?.pricePerTicket}$</h6>
              <p>per ticket</p>
            </div>
            <div>
              <h6>{raffle?.totalTickets} </h6>
              <p>paid tickets</p>
            </div>
            <div>
              <h6>{raffle?.totalTickets - raffle?.ticketsSold}</h6>
              <p>tickets remaining</p>
            </div>
          </div>
          <div className="enter__raffle__end__info">
            <p>Raffle Ended</p>
          </div>
          {winner && (
            <div>
              <div
                className="ended__winner"
                style={{ width: "50vw", marginBottom: "5vh" }}
              >
                <h2 className="heading">Winner </h2>
                <div className="ended__winner__container">
                  <div className="ended__winner__info">
                    <img src={winner?.luckyUser?.profile} alt="image" />
                    <h4 className="name">{winner?.luckyUser?.name}</h4>
                  </div>
                  <div className="trophy">
                    <img src={Trophy} alt="trophy" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EnterRaffle;
