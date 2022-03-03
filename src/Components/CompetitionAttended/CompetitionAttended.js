import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

const CompetitionAttended = () => {
  const [raffles, setRaffles] = useState([]);
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    api
      .get("/ticket/user-tickets")
      .then((res) => {
        console.log(res.data);
        let temp = res.data.filter((t) => t.isRaffleEnded);
        setTickets(temp);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    if (tickets) {
      let array = tickets.map((ticket) => {
        return ticket.raffle;
      });
      /****  get unique raffls to avoid duplication*/
      const uniqueArr = [...new Set(array.map((arr) => arr._id))];
      console.log("unique arr", uniqueArr);
      let uniqueRaffles = [];

      uniqueArr.forEach((u) => {
        let n = array.length;
        for (let i = 0; i < n; i++) {
          if (u === array[i]._id) {
            uniqueRaffles.push(array[i]);
            break;
          }
        }
      });
      console.log("unique raffles>> ", uniqueRaffles);
      /************* */
      setRaffles(uniqueRaffles);
      console.log("Live competition I have attended>", array);
    }
  }, [tickets]);

  return (
    <div className="competitions__container">
      {raffles && raffles.length > 0 ? (
        <table className="competitions">
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Winning Status</th>
            <th>Actions</th>
          </tr>

          {raffles.map((item) => {
            return (
              <tr className="">
                <td>{item?.title}</td>

                <td className="">Ended</td>
                <td>False</td>
                <td className="">
                  <button
                    onClick={(e) => navigate(`/enter-raffle/${item?._id}`)}
                  >
                    Visit Raffle
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      ) : (
        <div className="confirmed__empty">
          <h6>No joined raffle</h6>
        </div>
      )}
    </div>
  );
};

export default CompetitionAttended;
