import React, { useEffect, useState } from "react";
import "./RaffleCarousel.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import api from "../../utils/api";

import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
import RaffleItem from "../RaffleItems/RaffleItem";
const RaffleCarousel = () => {
  const [raffles, setRaffles] = useState([]);
  useEffect(() => {
    api
      .get("/raffle/all-live-raffles")
      .then((res) => {
        console.log("carousel Raffles", res.data);
        setRaffles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="raffle__carousel">
      <h1>Most Popular Raffles</h1>
      <Splide
        options={{
          rewind: true,
          width: 1100,
          gap: "0.5rem",
          perPage: 3,
          interval: 5000,
          autoplay: "play",
          breakpoints: {
            760: {
              perPage: 2,
              interval: 3000,
            },
          },
        }}
      >
        {raffles.length > 0 &&
          raffles.map((raffle) => (
            <SplideSlide>
              <RaffleItem raffle={raffle} />
            </SplideSlide>
          ))}
      </Splide>
    </div>
  );
};

export default RaffleCarousel;
