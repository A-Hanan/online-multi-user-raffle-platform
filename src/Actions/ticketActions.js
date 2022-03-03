import api from "../utils/api";

export const generateTicket = async (
  raffle,
  currentUser,
  ticketCount,
  navigate
) => {
  let prevNum = raffle?.ticketsSold ? raffle?.ticketsSold : 0;
  /*console.log("generate ticket> ", raffle, currentUser);*/
  console.log("prevNum>", prevNum);
  /*generating tickets requested by user*/
  let isError = false;
  for (let i = 0; i < ticketCount; i++) {
    prevNum++;
    let body = {
      ticketNumber: prevNum,
      raffle: raffle,
      ticketHolder: currentUser,
      raffleId: raffle?._id,
      ticketHolderId: currentUser?.id,
    };
    api
      .post("/ticket/create-ticket", body)
      .then((res) => {
        console.log("create ticket response", res.data);
        /*incremnting raffl ticket sold*/
        api
          .put(`/raffle/increment-ticket-sold/${raffle?._id}`)
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        return console.log("err at create ticket>>", err);
        isError = true;
      });
  }
  navigate("/tickets");
  /*  if (!isError) {
      console.log("prev num while updating>>. ", prevNum);
      api
        .put(`/raffle/increment-ticket-sold/${raffle?._id}`, {
          ticketsSold: prevNum,
        })
        .then((res) =>
          console.log("res of updating raffle ticket sold>", res.data)
        )
        .catch((err) =>
          console.log("error of updating raffle ticket sold>", err)
        );
    }*/
};
