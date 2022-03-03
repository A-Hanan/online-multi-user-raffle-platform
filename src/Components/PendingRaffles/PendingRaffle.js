import React, { useEffect, useState } from "react";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { endRaffleAndDrawWinner } from "../../Actions/endRaffleAndDrawWinner";

const PendingRaffle = ({ raffle }) => {
  const navigate = useNavigate();
  const [publishingSuccessModel, showPublishingSuccessModel] = useState(false);
  useEffect(() => {
    console.log(raffle);
  }, []);
  const publish = (e) => {
    e.preventDefault();
    api
      .post("/raffle/publish", { raffleId: raffle._id })
      .then((res) => {
        console.log("res of publish", res.data);
        alert("Your Raffle is live now.");
        navigate("/host-raffle/live");
      })
      .catch((err) => console.log(err));
    navigate("/host-raffle/live");
  };
  const endRaffle = (e,raffle) => {
    e.preventDefault();
    endRaffleAndDrawWinner(raffle);
  };
  const editRaffle = (e, raffleId) => {
    e.preventDefault();
    navigate(`/host-raffle/edit/${raffleId}`);
  };
  const deleteRaffle = (e, raffleId) => {
    e.preventDefault();
    console.log("raffleid", raffleId);
    api
      .delete("/raffle/delete", { raffleId })
      .then((res) => {
        console.log(res);
        alert("your raffle is deleted sucessfully");
        navigate(`/host-raffle`);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="pending__raffle">
      <div className="info__container">
        <div className="pending__raffle__data">
          <div className="data">
            <h4>ID</h4>
            <h5>1</h5>
          </div>
          <div className="data">
            <h4>Title</h4>
            <h5>{raffle?.title}</h5>
          </div>
          {/* <div className="data">
            <h4>Description</h4>
            <h5>{raffle.description}</h5>
          </div> */}
          <div className="data">
            <h4>Category</h4>
            <h5>{raffle?.category}</h5>
          </div>
          <div className="data">
            <h4>Ticket Price</h4>
            <h5>{raffle?.pricePerTicket}</h5>
          </div>
          <div className="data">
            <h4>Total Tickets</h4>
            <h5>{raffle?.totalTickets}</h5>
          </div>
          <div className="data">
            <h4>Tickets Sold</h4>
            <h5>98</h5>
          </div>
          <div className="data">
            <h4>Ends</h4>
            <h5>{new Date(raffle?.expiryDate).toDateString()}</h5>
          </div>
          <div className="data">
            <h4>Total Revenue</h4>
            <h5>$10000</h5>
          </div>
          <br />
          <div className="data">
            <h4>Status</h4>
            {raffle?.status === "Pending" && (
              <h5 style={{ color: "rgb(231, 41, 41)" }}>Pending</h5>
            )}
            {raffle?.status === "Live" && <h5>Live</h5>}
          </div>
        </div>
        <div className="pending__raffle__image">
          <img src={raffle?.image} alt="image" />
        </div>
      </div>
      <div className="options__container">
        {raffle?.status === "Pending" && (
          <>
            <div
              className="pending__raffle__option"
              onClick={(e) => {
                editRaffle(e, raffle._id);
              }}
            >
              <ModeEditOutlinedIcon />
              <h6>Edit</h6>
            </div>
            <div
              className="pending__raffle__option"
              onClick={(e) => deleteRaffle(e, raffle._id)}
            >
              <DeleteOutlineOutlinedIcon />
              <h6>Delete</h6>
            </div>
            <div
              className="pending__raffle__option"
              onClick={(e) => publish(e)}
            >
              <PublishOutlinedIcon />
              <h6>Publish</h6>
            </div>
          </>
        )}
        {raffle?.status === "Live" && (
          <>
            <div
              className="pending__raffle__option"
              onClick={(e) => endRaffle(e,raffle)}
            >
              <PublishOutlinedIcon />
              <h6>End The Raffle</h6>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PendingRaffle;
