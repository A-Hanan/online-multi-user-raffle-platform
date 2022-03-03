import React, { useEffect, useState } from "react";
import "./Account.css";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import api from "../../utils/api";
import { Form, Button, Col, Container } from "react-bootstrap";
import CompetitionAttended from "../../Components/CompetitionAttended/CompetitionAttended";
import CompetitionAttending from "../../Components/CompetitionAttending/CompetitionAttending";

const Account = () => {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const [emailSent, setEmailSent] = useState(false);
  const [disableVerifyButton, setDisableVerifyButton] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [showUploadButton, setShowUploadButton] = useState(false);

  console.log(currentUser);

  useEffect(() => {
    api
      .post("/auth/getuser")
      .then((res) => {
        console.log("res from getuser", res);
        const data = res.data;
        if (res.data.verified === false) {
          currentUser.verified = false;
          let temp = { ...currentUser, verified: false };
          localStorage.setItem("currentUser", JSON.stringify(temp));
        } else if (res.data.verified === true) {
          currentUser.verified = true;
          let temp = { ...currentUser, verified: true };
          localStorage.setItem("currentUser", JSON.stringify(temp));
        }
      })
      .catch((err) => console.log("error from get user", err));
  }, []);
  const sendVerificationEmail = () => {
    console.log("running");
    setDisableVerifyButton(true);

    const body = {
      _id: currentUser.id,
      email: currentUser.email,
    };
    console.log(body);
    api
      .post("/auth/send-verify-email", body)
      .then((res) => {
        console.log("res>>", res);
        setEmailSent(true);
      })
      .catch((err) => console.log(err));
  };
  const uploadPhoto = async (e) => {
    console.log(e.target);
    console.log("running upload file ");
    let files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "iamluckyticket");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dosfquxpc/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setProfileImage(file.secure_url);
    let e2 = { target: { name: "image", value: file.secure_url } };
    // handleChange(e2);
    console.log("file profie image>>> ", file);
  };
  const saveProfile = (e) => {
    e.preventDefault();
    if (profileImage !== "") {
      api
        .put("/user/updateProfileImage", {
          userId: currentUser?.id,
          imgUrl: profileImage,
        })
        .then((res) => {
          console.log("res from uload profile", res.data);
          var currentObject = Object.assign(currentUser, {
            profile: profileImage,
          });
          console.log("profile ", currentObject);
          localStorage.setItem("currentUser", JSON.stringify(currentObject));
          setShowUploadButton(false);
   
        })
        .catch((err) => console.log("error from uploading profile", err));
    }
  };
  return (
    <div className="account__page">
      <div className="account__page__user__info">
        {/* <img
          className="profile__image"
          src={
            currentUser?.profile
              ? currentUser?.profile
              : "https://www.cheshirescouts.org.uk/wp-content/uploads/blank-picture.jpg"
          }
          alt="profile"
        /> */}
        <Avatar
          className="profile__image"
          src={currentUser?.profile ? currentUser?.profile : profileImage}
        >
          {currentUser?.name[0]}
        </Avatar>
        {currentUser?.profile === "" && (
          <>
            <button
              className="upload__profile__photo__btn"
              onClick={(e) => setShowUploadButton(true)}
            >
              upload photo
            </button>
            {/* <input type="file" placeholder="select profile image" /> */}
            {showUploadButton && (
              <div
                style={{ height: "5vh", marginBottom: "3vh", display: "flex" }}
              >
                <Form.Control
                  type="file"
                  name="image"
                  required
                  style={{ height: "5vh" }}
                  onChange={(e) => uploadPhoto(e)}
                />
                <Button
                  style={{
                    marginLeft: "10px",
                    backgroundColor: "#39b54a",
                    border: "none",
                  }}
                  variant="primary"
                  onClick={(e) => saveProfile(e)}
                >
                  Upload
                </Button>
              </div>
            )}
          </>
        )}
        <h1 className="account__name">{currentUser?.name}</h1>
        {/* <h1 className="account__email">{currentUser?.email}</h1>
        <div className="change__account__info">
          <p className="account__change__username__para">Change Username</p>
          <p className="account__change__password__para">Change Password</p>
          <p className="account__change__profile__para">Change Profile pic</p>
        </div> */}
        <br />
        <div className="account__email__verify">
          <h4>Email</h4>
          <h6>{currentUser?.email}</h6>
          {currentUser?.verified ? (
            <h6 className="email__sent__text">verified</h6>
          ) : emailSent ? (
            <h6 className="email__sent__text">email sent</h6>
          ) : (
            <button
              disabled={disableVerifyButton ? true : false}
              onClick={sendVerificationEmail}
            >
              verify
            </button>
          )}
        </div>
        <br />
      </div>
      {/* <div className="account__verification__container">
        <div>
          <input type="text" placeholder="Enter email to verify" />
          <button>Verify</button>
        </div>
        <div>
          <input type="text" placeholder="Enter phone number to verify" />
          <button>Verify</button>
        </div>
      </div> */}
      <div className="account__live__competitions">
        <h1>Live Competitions</h1>
        <CompetitionAttending />
      </div>
      <div className="account__ended__competitions">
        <h1>Ended Competitions</h1>
        <CompetitionAttended />
      </div>
    </div>
  );
};

export default Account;
