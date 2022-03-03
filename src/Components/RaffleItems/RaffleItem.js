import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Avatar } from "@mui/material";
import { Navigate, useavigate, useNavigate } from "react-router-dom";
import { endRaffleAndDrawWinner } from "../../Actions/endRaffleAndDrawWinner";

const RaffleItem = ({ raffle }) => {
  const navigate = useNavigate();
  const [endTime, setEndTime] = useState();
  useEffect(() => {
    var now = new Date().getTime();
    var countDownDate = new Date(raffle?.expiryDate);
    var timeleft = countDownDate - now;
    if (timeleft < 0) {
      console.log("ending");
      endRaffleAndDrawWinner(raffle);
    }

    var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    if (days > 1) {
      setEndTime(`${days} Days`);
    } else {
      setEndTime(`${hours} Hours`);
    }
  }, [raffle]);

  return (
    <div
      className="raffle__item"
      onClick={() => navigate(`/enter-raffle/${raffle?._id}`)}
    >
      <div className="raffle__item__info">
        <div className="raffle__item__info__data">
          {/* <button onClick={(e) => endRaffleAndDrawWinner(raffle)}>
            end raffle
          </button> */}
          <div>
            <h6>{raffle?.pricePerTicket}$</h6>
            <p>per ticket</p>
          </div>
          <div>
            <h6>{raffle?.totalTickets} </h6>
            <p>Paid Tickets</p>
          </div>
          <div>
            <h6>{endTime}</h6>
            <p>Ends</p>
          </div>
        </div>
        <div className="raffle__image__box">
          <img src={raffle?.image} alt="Product image" />
        </div>
        <div className="title__raffle">{raffle?.title} </div>
      </div>
      <div className="raffle__item__seller__info">
        <Avatar
          src="https://www.un.org/sites/un2.un.org/files/styles/large-article-image-style-16-9/public/human-rights-exhibits.jpg?itok=c25JiF90"
          alt="P"
          className="dp"
        />
        <h4 className="name">John Doe</h4>
      </div>
    </div>
    /*  <div className="raffle__item">
       <img
         src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGhvdG9ncmFwaGVyfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
         alt="Product image"
       />
       <h5 className="title">Horse</h5>
       <p className="description">
         A black horse with golden tale makes an amazing fairytale
       </p>
       <button>Buy a Ticket</button>
       <h6>98% sold</h6>
     </div>
    <Card style={{ width: "16rem", margin: "10px" }} className="g-4">
      <Card.Img
        variant="top"
        src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGhvdG9ncmFwaGVyfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
      />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button
          variant="primary"
          style={{ backgroundColor: "#006838", borderColor: "#006838" }}
        >
          Go somewhere
        </Button>
      </Card.Body>
    </Card>*/
  );
};

export default RaffleItem;
