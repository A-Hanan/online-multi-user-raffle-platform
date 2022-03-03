import React, { useEffect, useState } from "react";
import "./EditRaffle.css";
import { useParams } from "react-router-dom";
import MultiStepForm from "../HostRaffleForm/MultiStepForm";
import api from "../../utils/api";

const EditRaffle = () => {
  const { raffleId } = useParams();
  const [raffleValues, setRaffleValues] = useState();
  useEffect(() => {
    if (raffleId) {
      console.log("raffleId> ", raffleId);
      api
        .get(`/raffle/getById/${raffleId}`)
        .then((res) => {
          if (res.data) {
            const raffle = res.data;
            console.log("res.data ", raffle);
            let tempValues = {
              _id: raffleId,
              title: raffle.title,
              description: raffle.description,
              image: raffle.image,
              category: raffle.category,
              ticketValue: raffle.pricePerTicket,
              numberOfTickets: raffle.totalTickets,
              expiryDate: raffle.expiryDate,
              address: raffle.address,
              city: raffle.city,
              phone: raffle.phone,
              zip: raffle.zip,
              agreeTerms: true,
              feeBearer: raffle.feeBearer,
            };
            setRaffleValues(tempValues);
            setTimeout(
              () => console.log("raffleValues at 34", tempValues),
              500
            );
          }
        })
        .catch((err) => console.log(err.message));
    }
  }, []);
  return (
    <div className="host__raffle__form">
      <MultiStepForm isEditing={true} raffleValues={raffleValues} />
    </div>
  );
};

export default EditRaffle;
