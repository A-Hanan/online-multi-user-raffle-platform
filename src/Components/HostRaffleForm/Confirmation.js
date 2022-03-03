import React, { Component, useEffect } from "react";
import { Button, Container, ModalTitle } from "react-bootstrap";
import { registerRaffle, updateRaffle } from "../../Actions/raffleActions";
import { useNavigate } from "react-router-dom";

const Confirmation = ({ inputValues, nextStep, prevStep }) => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("input values at confirmation", inputValues);
  }, []);
  const back = (e) => {
    e.preventDefault();
    prevStep();
  };

  const constsaveAndContinue = (e) => {
    e.preventDefault();
    nextStep();
  };

  const confirmRaffle = (e) => {
    e.preventDefault();
    /* console.log("raffle values> ", inputValues);*/
    registerRaffle(inputValues, navigate);
  };
  const updateTheRaffle = (e) => {
    e.preventDefault();
    
    updateRaffle(inputValues, navigate);
  };

  const {
    title,
    description,
    image,
    ticketValue,
    category,
    numberOfTickets,
    expiryDate,
    city,
    address,
    phone,
    zip,
    feeBearer,
  } = inputValues;

  return (
    <Container style={{ padding: "30px" }}>
      {/* <h1>Confirm your Details</h1> */}
      <h3>Confirm if the following details are correct.</h3>
      <br />
      <p>Ad Titile: {title}</p>
      <p>Description: {description}</p>
      <p>image: </p>
      <img
        src={image}
        width="250px"
        height="250px"
        style={{ marginBottom: "40px" }}
      />
      <p>category: {category}</p>
      <p>Price per Ticket: {ticketValue} $</p>
      <p>Total Number of tickets: {numberOfTickets}</p>
      <p>Expiry Date: {new Date(expiryDate).toDateString()}</p>
      <p>fee Bearer: {feeBearer}</p>
      <br />
      <p>
        Following info will kept secret until the need of showing it to winner.
      </p>
      <p>City: {city}</p>
      <p>Address: {address}</p>
      <p>Zip: {zip}</p>
      <p>Phone: {phone}</p>
      <Button variant="secondary" onClick={back}>
        Back
      </Button>{" "}
      {inputValues._id && inputValues._id ? (
        <Button variant="secondary" onClick={updateTheRaffle}>
          Update
        </Button>
      ) : (
        <Button variant="secondary" onClick={confirmRaffle}>
          Confirm
        </Button>
      )}
    </Container>
  );
};

export default Confirmation;
