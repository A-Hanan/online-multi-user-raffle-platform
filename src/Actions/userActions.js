import api from "../utils/api";
export const registerUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });
  console.log("user at userActions >>> ", user);
  try {
    const response = await api.post("/auth/createUser", user);
    setTimeout(() => {
      console.log("response at register>>>", response);
    }, 1000);
    dispatch({ type: "USER_REGISTER_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "USER_REGISTER_FAILED", payload: error });
    console.log("error at register>>>", error);
  }
};

export const loginUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });
  console.log("user request at loginUserAction>>> ", user);
  try {
    const response = await api.post("/auth/login", user);
    const userData = response.data.userData;
    localStorage.setItem("token", response.data.authtoken);
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: userData });
    localStorage.setItem("currentUser", JSON.stringify(userData));

    window.location.href = "/";
  } catch (error) {
    dispatch({ type: "USER_LOGIN_FAILED", payload: error });
  }
};

export const loginUserByGoogle = (data) => async (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });
  let user = {
    id: data?.googleId,
    name: data?.profileObj.name,
    email: data?.profileObj.email,
    profile: data?.profileObj.imageUrl,
    verified: true,
  };
  let token = data?.tokenId;

  try {
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: user });
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("token", token);
    window.location.href = "/";
  } catch (error) {
    dispatch({ type: "USER_LOGIN_FAILED", payload: error });
  }
};
export const loginUserByFacebook = (data) => async (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });
  let user = {
    id: data?.id,
    name: data?.name,
    email: data?.email,
    profile: data?.picture.data.url,
    verified: true,
  };
  /* let token = data?.signedRequest;*/
  let token;
  try {
    token = await api
      .post("/auth/get-auth-token-fb-user", {
        userID: data.userID,
      })
      .then((res) => res.data);
  } catch (err) {
    console.log(err);
    dispatch({ type: "USER_LOGIN_FAILED", payload: err });
    return;
  }
  console.log("action fb data>>> ", user);

  try {
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: user });
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("token", token);
    window.location.href = "/";
  } catch (error) {
    dispatch({ type: "USER_LOGIN_FAILED", payload: error });
  }
};
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("cartItems");
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
  localStorage.clear();
  window.location.href = "/login";
};
/*
export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: "GET_USERS_REQUEST" });

  try {
    const response = await axios.get("/api/users/getallusers");
    console.log(response);
    dispatch({ type: "GET_USERS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_USERS_FAILED", payload: error });
  }
};

export const deleteUser = (userid) => async (dispatch) => {
  try {
    await axios.post("/api/users/deleteuser", { userid });
    alert("User deleted successfully!!!");
    window.location.reload();
  } catch (error) {
    alert("Something went wrong!!!");
    console.log(error);
  }
};
*/
