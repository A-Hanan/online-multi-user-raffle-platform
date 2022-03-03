import React from "react";
import "./Footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="columns">
        <div className="column_one">
          {/* <img src={Logo} alt="logo" /> */}
          <h1>About Us</h1>
          <p>
            Each week we guarantee multiple winners with tens of thousands of
            dollors up for grabs, and every ticket bought helps us continue to
            raise money for our charity partners. Whether you're interested in
            winning your Dream Home, weekly Lifestyle Prizes, or our fantastic
            Fixed Odds Competitions, we're here to put a smile on your face.
            Dream Big. Do Good.
          </p>
        </div>
        <div className="column_two">
          <Link to="/">Home</Link>
          <Link to="/search-raffles">Win Prizes</Link>
          <Link to="/host-raffle">Host Raffle</Link>
          <Link to="/winners">Winners</Link>
          <Link to="/account">Account</Link>
        </div>
        <div className="column_three">
          <img src={Logo} alt="logo" />
          <div className="row_one">
            <h4>Follow Us : </h4>
            <div className="social__icons">
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
          <div className="row_two">&copy; 2022 IAMLUCKYTICKET</div>
        </div>
      </div>
      <div className="rows">
        {/* <div className="row_one">
          <h4>Follow Us : </h4>
          <div className="social__icons">
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
        <div className="row_two">&copy; 2022 IAMLUCKYTICKET</div> */}
      </div>
    </div>
  );
};

export default Footer;
