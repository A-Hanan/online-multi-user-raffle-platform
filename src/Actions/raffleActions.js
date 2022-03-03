import api from "../utils/api";

export const registerRaffle = async (raffle, navigate) => {
  const raffleObject = {
    title: raffle.title,
    description: raffle.description,
    image: raffle.image,
    pricePerTicket: raffle.ticketValue,
    totalTickets: raffle.numberOfTickets,
    category: raffle.category,
    expiryDate: raffle.expiryDate,
    city: raffle.city,
    address: raffle.address,
    phone: raffle.phone,
    zip: raffle.zip,
    feeBearer: raffle.feeBearer,
  };
  console.log("raffle at raffleActions >>> ", raffleObject);
  try {
    const response = await api.post("/raffle/register-raffle", raffleObject);
    setTimeout(() => {
      console.log("response at register raffle>>>", response);
      navigate("/host-raffle/pending");
    }, 1000);
  } catch (error) {
    console.log("error at register raffle>>>", error);
  }
};

export const updateRaffle = async (raffle, navigate) => {
  const raffleId = raffle?._id;
  const raffleObject = {
    title: raffle.title,
    description: raffle.description,
    image: raffle.image,
    pricePerTicket: raffle.ticketValue,
    totalTickets: raffle.numberOfTickets,
    category: raffle.category,
    expiryDate: raffle.expiryDate,
    city: raffle.city,
    address: raffle.address,
    phone: raffle.phone,
    zip: raffle.zip,
    feeBearer: raffle.feeBearer,
  };
  console.log("raffle at raffleActions >>> ", raffleObject);
  try {
    const response = await api.post("/raffle/update", {
      raffleId,
      raffleObject,
    });
    setTimeout(() => {
      console.log("response at update raffle>>>", response);
      alert("your raffle data is updated");
      navigate("/host-raffle");
    }, 1000);
  } catch (error) {
    console.log("error at register raffle>>>", error);
  }
};
