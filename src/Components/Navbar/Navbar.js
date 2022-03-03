import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/images/logo.png";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Actions/userActions";
import { NavLink } from "react-router-dom";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import CloseIcon from "@mui/icons-material/Close";

const Navbar2 = ({ showLoading }) => {
  const [showNav, setShowNav] = useState(false);
  const [showHostRaffleMenu, setShowHostRaffleMenu] = useState(false);
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const [currentPath, setCurrentPath] = useState(
    window.location.pathname.split("/")[1]
  );
  const dispatch = useDispatch();
  useEffect(() => {
 
  }, [window.location.pathname, currentUser]);
  useEffect(
    () => setCurrentPath(window.location.pathname.split("/")[1]),
    [window.location.pathname]
  );


  return (
    <>
      {currentPath !== "login" && currentPath !== "email-verification" && (
        <>
          <div className="navbar">
            <div className="nav__logo__container">
              <NavLink to="/">
                <img className="logo" src={logo} alt="I Am Lucky Ticket" />
              </NavLink>
            </div>
            <div className="nav__menu__container">
              <ul>
                <li>
                  <NavLink to="/host-raffle" onClick={() => showLoading(true)}>
                    Host Raffles
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/search-raffles"
                    onClick={() => showLoading(true)}
                  >
                    Search Raffles
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/winners" onClick={() => showLoading(true)}>
                    Winners
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/account" onClick={() => showLoading(true)}>
                    Account
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/tickets" onClick={() => showLoading(true)}>
                    Tickets
                  </NavLink>
                </li>
              </ul>
            </div>
            <div
              className="nav__login__container"
              onClick={dispatch(logoutUser)}
            >
              <a href={currentUser?.profile ? currentUser?.profile : "#"}>
                <Avatar src={currentUser?.profile}>
                  {!currentUser?.profile && currentUser?.name[0]}
                </Avatar>
              </a>

              <h3> {currentUser?.id ? "Logout" : "Login"}</h3>
            </div>
            <IconButton
              className="nav__icon"
              onClick={() => setShowNav(!showNav)}
            >
              <MenuIcon />
            </IconButton>
          </div>
          {/* <div className="nav__verification__info">
            <p>Your account is not verified. </p>
            <button>Verify now</button>

          </div> */}
          <div className={showNav ? "show nav__sidebar" : "nav__sidebar"}>
            <div
              className={
                showNav ? "show nav__sidebar__content" : "nav__sidebar__content"
              }
            >
              <ul>
                <li>
                  <a href="/search-raffles">Search Raffles</a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => setShowHostRaffleMenu(!showHostRaffleMenu)}
                  >
                    Host a Raffle
                  </a>
                  <ArrowDropDownOutlinedIcon />
                </li>

                <div
                  className={
                    showHostRaffleMenu
                      ? "show host__raffle__menu"
                      : "host__raffle__menu"
                  }
                >
                  <li>
                    <a href="/host-raffle/create">Create Raffle</a>
                  </li>
                  <li>
                    <a href="/host-raffle/live">Live Raffles</a>
                  </li>
                  <li>
                    <a href="/host-raffle/pending">Pending Raffles</a>
                  </li>
                  <li>
                    <a href="/host-raffle/ended">Ended Raffles</a>
                  </li>
                </div>

                <li>
                  <a href="/winners">Winners</a>
                </li>
                <li>
                  <a href="/account">Account</a>
                </li>
                <li>
                  <a href="/tickets">Tickets</a>
                </li>
                <li>
                  <a href="/about">About</a>
                </li>
              </ul>
              <div onClick={dispatch(logoutUser)}>
                <Avatar src="" />
                <h3>{currentUser?.id ? "Logout" : "Login"}</h3>
              </div>
            </div>
          </div>
          {/* add class show to nav verifiaction info */}
          <div className="nav__verification__info">
            <p>Your account is not verified. </p>
            <button>Verify now</button>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar2;
