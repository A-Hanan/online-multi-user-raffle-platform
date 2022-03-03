import React from "react";
import "./Dashboard.css";
import Footer from "../Footer/Footer";
import { Link } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
const Dashboard = ({ setActive }) => {
  return (
    <div className="dashboard">
      <div className="dashboard__upper__container">
        <h2>Home</h2>
        <h6>Search Raffles</h6>
        <h2>Host a Raffle</h2>
        <h6 onClick={() => setActive("create")}>Create New</h6>
        <h6 onClick={() => setActive("live")}>Live</h6>
        <h6 onClick={() => setActive("pending")}>Pending</h6>
        <h6 onClick={() => setActive("ended")}>Ended</h6>
        <h2>Your Tickets</h2>
        <h6>Tickets</h6>
        <h2>Winners</h2>
        <h6>Recent Winners</h6>
        <h2>Account</h2>
        <h6>Your Profile</h6>
        <h6>Contact details</h6>
      </div>

      <div className="dashboard__footer">
        <div className="nav__links">
          <Link to="/">Home</Link>
          <Link to="/search-raffles">Win Prizes</Link>
          <Link to="/host-raffle">Host Raffle</Link>
          <Link to="/contact-us">Contact</Link>
          <Link to="/faqs">FAQs</Link>
        </div>
        <div className="social__links">
          <Link to="www.facebook.com">
            <FacebookIcon />
          </Link>
          <Link to="www.instagram.com">
            <InstagramIcon />
          </Link>
          <Link to="www.linkedin.com">
            <LinkedInIcon />
          </Link>
          <Link to="www.twitter.com">
            <TwitterIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
