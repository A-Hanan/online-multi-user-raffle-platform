import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginForm from "./Pages/LoginForm/LoginForm";
import NotFound from "./Components/404/NotFound";

import Home from "./Pages/Home/Home2";
import SearchRaffle from "./Pages/SearchRaffle/SearchRaffle";
import HostRaffle from "./Pages/HostRaffle/HostRaffle";
import AboutUs from "./Pages/About/About";
import FAQs from "./Pages/FAQs/FAQs";
import EnterRaffle from "./Pages/EnterRaffle/EnterRaffle";
import PrivateRoute from "./Components/Routing/PrivateRoute";
import Navbar from "./Components/Navbar/Navbar";
import ContactUs from "./Pages/ContactUs/ContactUs";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "./Components/Loading/Loading";
import Account from "./Pages/Account/Account";
import VerifyEmail from "./Pages/VerifyEmail/VerifyEmail";
import PaymentPage from "./Pages/PaymentPage/PaymentPage";
import Tickets from "./Pages/Tickets/Tickets";
import Winners from "./Pages/Winners/Winners";

function App() {
  const [loading, showLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      showLoading(false);
    }, 500);
  }, [loading]);
  return (
    <BrowserRouter>
      <Navbar showLoading={showLoading} />
      {loading && <Loading />}

      <Routes>
        {/* <Route path="/login" exact element={<Login />} /> */}
        {/* <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/" element={<Home />} />
        </Route> */}
        {/* <Route path="/login" exact element={<Login />} /> */}
        <Route path="/login" exact element={<LoginForm />} />
        {/* <Route
          path="/host-raffle"
          exact
          element={<HostRaffle showLoading={showLoading} />}
        /> */}
        <Route exact path="/host-raffle" element={<PrivateRoute />}>
          <Route
            path="/host-raffle"
            exact
            element={<HostRaffle showLoading={showLoading} />}
          />
        </Route>
        <Route
          exact
          path="/host-raffle/:subCategory"
          element={<PrivateRoute />}
        >
          <Route
            path="/host-raffle/:subCategory"
            exact
            element={<HostRaffle showLoading={showLoading} />}
          />
        </Route>
        <Route
          exact
          path="/host-raffle/:subCategory/:raffleId"
          element={<PrivateRoute />}
        >
          <Route
            path="/host-raffle/:subCategory/:raffleId"
            exact
            element={<HostRaffle showLoading={showLoading} />}
          />
        </Route>
        <Route path="/search-raffles" exact element={<SearchRaffle />} />
        {/* <Route path="/About" exact element={<AboutUs />} /> */}
        <Route path="/FAQs" exact element={<FAQs />} />
        <Route path="/contact-us" exact element={<ContactUs />} />

        <Route exact path="/enter-raffle/:raffleId" element={<PrivateRoute />}>
          <Route
            path="/enter-raffle/:raffleId"
            exact
            element={<EnterRaffle />}
          />
        </Route>

        {/* <Route exact path="/account" element={<PrivateRoute />}> */}
        <Route path="/account" exact element={<Account />} />
        {/* </Route> */}
        <Route
          exact
          path="/email-verification/:userId/:uniqueString"
          element={<PrivateRoute />}
        >
          <Route
            path="/email-verification/:userId/:uniqueString"
            exact
            element={<VerifyEmail />}
          />
        </Route>
        <Route exact path="/purchase-tickets" element={<PrivateRoute />}>
          <Route path="/purchase-tickets" exact element={<PaymentPage />} />
        </Route>
        <Route exact path="/tickets" element={<PrivateRoute />}>
          <Route path="/tickets" exact element={<Tickets />} />
        </Route>

        <Route path="/winners" exact element={<Winners />} />

        <Route exact path="/" element={<Home />} />
        {/* <PrivateRoute path="/" exact component={Home} /> */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
