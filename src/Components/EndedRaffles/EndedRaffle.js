import React, { useEffect, useState } from "react";
import Trophy from "../../assets/images/trophy.jpg";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import api from "../../utils/api";

const EndedRaffle = ({ raffle }) => {
  const [winner, setWinner] = useState();
  useEffect(() => {
    console.log("raffle>>>>", raffle);
    api
      .get(`/winner/byTicketId/${raffle?.winnerTicketId}`)
      .then((res) => {
        console.log("winner>", res.data);
        setWinner(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="ended__raffle">
      <div className="ended__raffle__info">
        {" "}
        <div className="info__container">
          <div className="data">
            <h4>ID</h4>
            <h5>{raffle?._id}</h5>
          </div>
          <div className="data">
            <h4>Title</h4>
            <h5>{raffle?.title}</h5>
          </div>
          {/* <div className="data">
            <h4>Description</h4>
            <h5>{raffle.description}</h5>
          </div> */}
          <div className="data">
            <h4>Category</h4>
            <h5>{raffle?.category}</h5>
          </div>
          <div className="data">
            <h4>Ticket Price</h4>
            <h5>{raffle?.pricePerTicket}</h5>
          </div>
          <div className="data">
            <h4>Total Tickets</h4>
            <h5>{raffle?.totalTickets}</h5>
          </div>
          <div className="data">
            <h4>Tickets Sold</h4>
            <h5>{raffle?.ticketsSold}</h5>
          </div>
          {/* <div className="data">
            <h4>Ends</h4>
            <h5>{raffle.expiryDate}</h5>
          </div> */}
          <div className="data">
            <h4>Total Revenue</h4>
            <h5>${raffle?.ticketsSold * raffle?.pricePerTicket}</h5>
          </div>
          <br />
          <div className="data">
            <h4>Status</h4>
            <h5>Ended</h5>
          </div>
        </div>
        <div className="ended__raffle__image">
          <img src={raffle?.image} alt="image" />
        </div>
      </div>
      <div className="ended__winner">
        <h2 className="heading">Winner </h2>
        <div className="ended__winner__container">
          <div className="ended__winner__info">
            <img src={winner?.luckyUser?.profile} alt="image" />
            <h4 className="name">{winner?.luckyUser?.name}</h4>
            <div className="contact">
              <h3>Contact</h3>
              {/* <div className="phone">
                <LocalPhoneOutlinedIcon />
                <h4>03052528906</h4>
              </div> */}

              <div className="email">
                <EmailOutlinedIcon />
                <h4>{winner?.luckyUser?.email}</h4>
              </div>
            </div>
          </div>
          <div className="trophy">
            <img src={Trophy} alt="trophy" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndedRaffle;
