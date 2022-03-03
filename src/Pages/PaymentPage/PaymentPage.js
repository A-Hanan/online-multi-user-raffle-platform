import React, { useEffect, useState } from "react";
import "./PaymentPage.css";
import StripeCheckout from "react-stripe-checkout";
import { Button } from "react-bootstrap";
import api from "../../utils/api";
import CloseIcon from "@mui/icons-material/Close";
import { generateTicket } from "../../Actions/ticketActions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const PaymentPage = ({ raffle, setShowPurchaseModel }) => {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const [ticketCount, setTicketCount] = useState(1);
  const { pricePerTicket, title } = raffle;
  const [product, setProduct] = useState({
    name: "React from FB",
    price: 10,
    productBy: "facebook",
  });
  useEffect(() => {
    let temp = pricePerTicket * ticketCount;
    temp = Math.round(temp * 10) / 10;
    setTotalPrice(temp);
  }, [ticketCount]);
  const increment = (e) => {
    e.preventDefault();
    if (ticketCount < 5) {
      setTicketCount(ticketCount + 1);
    }
  };
  const decrement = (e) => {
    e.preventDefault();
    if (ticketCount > 1) {
      setTicketCount(ticketCount - 1);
    }
  };

  const makePayment = (token) => {
    if (ticketCount < 1) {
      return alert("select atleast 1 ticket");
    }
    if (raffle?.totalTickets - raffle?.ticketsSold < ticketCount) {
      return alert("this much tickets are not available");
    }
    const body = {
      token,
      product,
    };
    api
      .post("/payment", body)
      .then((response) => {
        console.log("raffle at payment apge", raffle);
        generateTicket(raffle, currentUser, ticketCount, navigate);
        setShowPurchaseModel(false);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ticket purchasing Failed, Try again later.",
          footer: "Try Again Later",
        });
        setShowPurchaseModel(false);
      });
  };
  return (
    <div className="payment__page">
      <div className="payment__container">
        <CloseIcon onClick={() => setShowPurchaseModel(false)} />
        <h1>Purchase Tickets</h1>
        <div className="ticket__incrementor">
          <h6>How many tickets you want to purchase for {title}?</h6>
          <div>
            <button onClick={(e) => decrement(e)}>-</button>
            <p>{ticketCount} </p>
            <button onClick={(e) => increment(e)}>+</button>
          </div>
          <p>maximum 5 tickets could be purchased</p>
          <h4>Total Price : {totalPrice} $ </h4>
        </div>
        {/* Stripe key and token are very necessary for stripe checkout */}
        {/* process.env.REACT_APP_STRIPE_KEYstripe key could be */}
        <div className="stripe__container">
          <StripeCheckout
            stripeKey={
              "pk_test_51KWmfGCB2vzWo8QivUFlBrsOlaLreyu0QERRoCEYoG4DV6kXe3WGnrVYxDg5sgsDncXTZZRs4IvGgwqPtnbbV0zk00CY8vEdWi"
            }
            token={makePayment}
            name={raffle?.title}
            amount={totalPrice * 100}
          >
            <Button className="purchase__btn">Purchase Tickets</Button>
          </StripeCheckout>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
