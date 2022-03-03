import React, { useEffect, useState } from "react";
import "./VerifyEmail.css";
import { useParams } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import Loading from "../../Components/Loading/Loading";

const VerifyEmail = () => {
  const { userId, uniqueString } = useParams();
  const [success, setSuccess] = useState(false);
  const [isAlreadyVerified, setIsAlreadyVerified] = useState(false);
  const [loading, showLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      showLoading(false);
    }, 5000);
  }, [loading]);

  useEffect(() => {
    api
      .get(`/auth/getuserById/${userId}`)
      .then((res) => {
        if (res.data.verified === true) {
          setIsAlreadyVerified(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api
      .get(`/auth/verify/${userId}/${uniqueString}`)
      .then((res) => {
        console.log("res from get", res);
        setSuccess(true);
      })
      .catch((err) => {
        console.log("error from get>", err.message);
        setSuccess(false);
      });
  }, []);

  return (
    <>
      {loading && <Loading />}
      <div className="VerifyEmail">
        {/* <div>VerifyEmail</div>
      <h1>{uniqueString}</h1> */}
        {isAlreadyVerified ? (
          <div className="email__verified__success__container">
            <h1>
              {" "}
              Your email is already <span>verified</span>
            </h1>
            <CheckCircleIcon />
          </div>
        ) : (
          <div
            className={
              success
                ? "email__verified__success__container"
                : "email__verified__failure__container"
            }
          >
            {success ? (
              <h1>
                {" "}
                Your email has been verified <span>successfully</span>
              </h1>
            ) : (
              <h1>
                <span> Your email has not been verified</span>
              </h1>
            )}

            {success ? <CheckCircleIcon /> : <CancelIcon />}
            {/* {success && (
              <Link to="/">
                {" "}
                <button>Continue </button>
              </Link>
            )} */}
          </div>
        )}
      </div>
    </>
  );
};

export default VerifyEmail;
