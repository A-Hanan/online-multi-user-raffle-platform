import React from "react";
import "./WinnersCarousel.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
import Avatar from "@mui/material/Avatar";

const WinnersCarousel = () => {
  return (
    <div className="winners__carousel">
      <h1>Previous Winners</h1>
      <Splide
        options={{
          rewind: true,
          width: 1300,
          gap: "1rem",
          perPage: 3,
          interval: 5000,
          autoplay: "play",
          breakpoints: {
            760: {
              perPage: 1,
              interval: 3000,
            },
          },
        }}
      >
        <SplideSlide>
          {/* <div className="user__info">
            <img
              src="https://randomuser.me/api/portraits/women/33.jpg"
              alt="Image 1"
            />
            <h3>Bran Adim</h3>
          </div>
          <div className="prize__info">
            <h3>Winner of IPHONE 12 Pro</h3>
            <img
              src="https://techcrunch.com/wp-content/uploads/2021/12/FC3_itGXEAA6z5g.jpg?w=1024"
              alt="prize"
            />
          </div> */}
          <div className="winner__container">
            <div className="winner__gradient"></div>
            <img
              className="prize__img"
              src="https://techcrunch.com/wp-content/uploads/2021/12/FC3_itGXEAA6z5g.jpg?w=1024"
              alt="prize"
            />
            <div className="winner__info">
              <Avatar />
              <div>
                <h3>Uzair Ahsa</h3>
                <h3>Prize won :-Honda 70 ($ 400)</h3>
              </div>
            </div>
          </div>
        </SplideSlide>
      </Splide>
    </div>
  );
};

export default WinnersCarousel;
