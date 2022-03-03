import React, { useEffect, useState } from "react";
import "./Home2.css";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/api";

import ReceiptIcon from "@mui/icons-material/Receipt";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import headerImage from "../../assets/images/happyMan2.jpg";
import headerImage2 from "../../assets/images/happyMan5.jpg";
import Footer from "../../Components/Footer/Footer";
import WinnersCarousel from "../../Components/WinnersCarousel/WinnersCarousel";
import RaffleCarousel from "../../Components/RafflesCarousel/RaffleCarousel";
import ContactUs from "../../Pages/ContactUs/ContactUs";
import FAQs from "../../Pages/FAQs/FAQs";
import Testimonials from "../../Components/Testimonials/Testimonials2";
import { useNavigate } from "react-router-dom";

const Home2 = () => {
  const navigate = useNavigate();
  const userstate = useSelector((state) => state.loginUserReducer);

  const { currentUser } = userstate;
  const dispatch = useDispatch();
  const [showSpinner, setShowSpinner] = useState(false);

  return (
    <>
      <div className="home__container">
        <header className="home__header">
          <div className="header__content">
            <h3>
              {" "}
              Great Opportunity to <span>win prizes</span> worth thousand of
              dollors
            </h3>
            <h6>IALT allow you to create your own raffle and earn money</h6>
            <div className="buttons">
              <button
                onClick={(e) => navigate("/search-raffles")}
                className="search__raffle__btn"
              >
                {/* See More <KeyboardArrowDownIcon /> */}
                Search Raffles
              </button>
              <button
                onClick={(e) => navigate("/host-raffle")}
                className="create__raffle__btn"
              >
                {/* See More <KeyboardArrowDownIcon /> */}
                Host Raffle
              </button>
            </div>
          </div>
          <div className="header__image">
            <img
              src={window.innerWidth > 768 ? headerImage : headerImage2}
              alt="header image"
            />
          </div>
        </header>

        <div className="counter__container">
          <h1>Where Dreaming Big Becomes Reality</h1>
          <div className="counter__boxes">
            <div className="counter__box">
              <h2 className="amount">$10,000</h2>
              <h5 className="counter__title">Total Prizes Won</h5>
            </div>
            <div className="counter__box">
              <h2 className="amount">2000</h2>
              <h5 className="counter__title">Previous Winners</h5>
            </div>
          </div>
        </div>
        {/* <Testimonials /> */}
        <RaffleCarousel />
        <div className="home__info__container">
          <div className="home__info__boxes">
            <div className="home__info__box">
              <ReceiptIcon />
              <h3>Sample Raffle Tickets</h3>
              <h6>
                Enjoy best-in-class raffle tickets options for your fundraiser.
                Sell Online and printed tickets to customize your compaign
              </h6>
            </div>
            <div className="home__info__box">
              <CardGiftcardIcon />
              <h3>Flexible Raffle Prizes</h3>
              <h6>
                Get Unlimited prize flexibility for your raffle. Easiely add
                your prizes and customize the raffle with images and description
              </h6>
            </div>
            <div className="home__info__box">
              <EmojiEventsIcon />
              <h3>Raffle Drawing Options</h3>
              <h6>
                Choose exactly when and where you draw your winners. Use an
                automated raffle Drawing which suits your needs
              </h6>
            </div>
          </div>
          <div className="home__info__para">
            <p>Sell numbered tickets and then randomly draw a winner</p>
          </div>
        </div>
        {/* <WinnersCarousel /> */}
      </div>
      <Testimonials />
      <FAQs />
      <ContactUs />
      <Footer />
    </>
  );
};

export default Home2;
