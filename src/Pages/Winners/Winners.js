import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import "./Winners.css";
import Trophy from "../../assets/images/trophy.jpg";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const Winners = () => {
  const [winners, setWinners] = useState([]);
  useEffect(() => {
    api
      .get("/winner")
      .then((res) => {
        console.log("winners>> ", res.data);
        setWinners(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="winners__page">
      <h1>Winners</h1>
      <div className="winners__container">
        {winners &&
          winners.map((winner) => (
            <div className="winner__box">
              <div className="userbar">
                <img src={winner?.luckyUser.profile} alt="profile" />
                <h4>{winner?.luckyUser.name}</h4>
              </div>
              <div className="raffle__info__box">
                <div className="left">
                  <h4>Prize Title</h4>
                  <h5>{winner.raffle.title}</h5>
                  <h4>Prize Description</h4>
                  <h5>{winner.raffle.description}</h5>
                </div>
                <div className="right">
                  <img src={winner.raffle.image} alt="" />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Winners;
