import api from "../utils/api";

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const endRaffleAndDrawWinner = async (raffle) => {
  console.log("end raffle and drwa winner", raffle);

  /*draw for winner*/
  let tickets = [];
  await api
    .get(`/ticket/raffle-tickets/${raffle?._id}`)
    .then((res) => {
      /*  console.log(res.data);*/
      tickets = res.data;
      console.log("tickets>", tickets);
    })
    .catch((err) => console.log(err));

  let min = 1;
  let max = raffle?.ticketsSold;
  let luckyNumber = randomInteger(min, max);

  /*search user with that lucky ticket number*/
  let luckyTicket = tickets.find((t) => t.ticketNumber === luckyNumber);
  while (!luckyTicket) {
    luckyNumber = randomInteger(min, max);
    luckyTicket = tickets.find((t) => t.ticketNumber === luckyNumber);
  }
  let luckyWinner = luckyTicket?.ticketHolder;

  /*set raffle status to ended*/

  await api
    .put(`/raffle/end-raffle/${raffle?._id}`)
    .then((res) => {
      console.log("ended raffle>>> ", res.data);
    })
    .catch((err) => console.log(err.message));

  /*draw a winner*/

  const body = {
    winnerTicketId: luckyTicket?._id,
  };
  await api
    .put(`/raffle/update-winner/${raffle?._id}`, body)
    .then((res) => {
      console.log("winner updated>>> ", res.data);
    })
    .catch((err) => console.log(err.message));

  /*create a winner data in db*/
  await api
    .post(`/winner/create-winner`, {
      winningTicket: luckyTicket,
      raffleId: luckyTicket.raffleId,
      raffle: luckyTicket.raffle,
      luckyUserId: luckyWinner.id,
      luckyUser: luckyWinner,
    })
    .then((res) => console.log("creating winner", res.data))
    .then((err) => console.log(err));

  /*set all the tickets of that raffle to isRaffleEnded===true*/
  await api
    .put(`/ticket/update-ticket-status/${raffle?._id}`)
    .then((res) => console.log(res.data))
    .then((err) => console.log(err));

  window.location.reload();
};
