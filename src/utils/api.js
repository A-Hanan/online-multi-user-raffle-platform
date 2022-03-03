import axios from "axios";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "https://ialt-api.herokuapp.com/api",
});
if (localStorage.token) {
  api.defaults.headers.common["auth-token"] = localStorage.getItem("token");
}

export default api;
