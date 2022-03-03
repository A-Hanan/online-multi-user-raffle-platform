import React, { useEffect, useState } from "react";
import "./LoginForm.css";
import signInImage from "../../assets/images/signin.jpg";
import signUpImage from "../../assets/images/signup.jpg";
import Logo from "../../assets/images/logo.png";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import loginValidation from "../../Actions/loginValidation";
import signupValidation from "../../Actions/signupValidation";
import Loading from "../../Components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  loginUserByGoogle,
  loginUserByFacebook,
} from "../../Actions/userActions";
import { registerUser } from "../../Actions/userActions";
import AES from "crypto-js/aes";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";

const FormPage = () => {
  const navigate = useNavigate();
  const [isFbLoginClicked, setIsFbLoginClicked] = useState(false);
  const loginstate = useSelector((state) => state.loginUserReducer);
  const { loading } = loginstate;
  const dispatch = useDispatch();
  const [showSignInForm, setShowSignInForm] = useState(true);
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const [signupCredentials, setSignupCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [loginErrors, setLoginErrors] = useState({});
  const [signupErrors, setSignupErrors] = useState({});

  useEffect(() => {
    console.log("loading >>>>>>", loading);
  }, [loading]);
  const googleSuccess = async (res) => {
    dispatch(loginUserByGoogle(res));
   
  };

  const googleError = () => {
    alert("Google Sign In was unsuccessful. Try again later");
  };

  const responseFacebook = (res) => {
    if (res.id && isFbLoginClicked) {
      dispatch(loginUserByFacebook(res));
      
      setIsFbLoginClicked(false);
    } else {
      console.log("err");
    }
  };

  const login = () => {

    setLoginErrors(loginValidation(loginCredentials));
    setTimeout(() => {
      if (
        Object.keys(loginErrors).length === 0 &&
        loginErrors.constructor === Object
      ) {
        alert("log in");
        dispatch(loginUser(loginCredentials));
      }
    }, 100);
  };
  const signup = () => {
    
    setSignupErrors(signupValidation(signupCredentials));
    setTimeout(() => {
      if (
        Object.keys(signupErrors).length === 0 &&
        signupErrors.constructor === Object
      ) {
        alert("signup in");
        var pass = AES.encrypt(
          signupCredentials.password,
          "IAMLUCKYTICKET"
        ).toString();
        const user = {
          name: signupCredentials.name,
          email: signupCredentials.email,
          pass,
        };
        dispatch(registerUser(user));
      }
    }, 100);
  };
  return (
    <div className="main">
      {loading && <Loading />}
      {showSignInForm ? (
        <section className="sign-in" style={{ zIndex: "100000" }}>
          <div className="container">
            <div className="signin-content">
              <div className="signin-image">
                <figure>
                  {/* <img src={signInImage} alt="sing up image" /> */}
                  <img src={Logo} alt="sing up image" />
                </figure>
                <a
                  href="#"
                  className="signup-image-link"
                  onClick={() => setShowSignInForm(!showSignInForm)}
                >
                  Create an account
                </a>
              </div>

              <div className="signin-form">
                <h2 className="form-title">Sign In</h2>
                <form method="#" className="register-form" id="login-form">
                  <div className="form-group">
                    <label htmlFor="your_name">
                      {/* <i className="zmdi zmdi-account material-icons-name"></i> */}
                      <EmailIcon />
                    </label>
                    <input
                      defaultValue={loginCredentials.email}
                      type="text"
                      name="your_name"
                      id="your_name"
                      placeholder="Your Email"
                      onChange={(e) =>
                        setLoginCredentials({
                          email: e.target.value,
                          password: loginCredentials.password,
                        })
                      }
                    />
                  </div>
                  {loginErrors.email && (
                    <h6 className="error__message">{loginErrors.email}</h6>
                  )}

                  <div className="form-group">
                    <label htmlFor="your_pass">
                      {/* <i className="zmdi zmdi-lock"></i> */}
                      <LockIcon />
                    </label>
                    <input
                      defaultValue={loginCredentials.password}
                      type="password"
                      name="your_pass"
                      id="your_pass"
                      placeholder="Password"
                      onChange={(e) =>
                        setLoginCredentials({
                          email: loginCredentials.email,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>
                  {loginErrors.password && (
                    <h6 className="error__message">{loginErrors.password}</h6>
                  )}

                  {/* <div className="form-group">
                    <input
                      type="checkbox"
                      name="remember-me"
                      id="remember-me"
                      className="agree-term"
                    />
                    <label htmlFor="remember-me" className="label-agree-term">
                      <span>
                        <span></span>
                      </span>
                      Remember me
                    </label>
                  </div> */}
                  <div className="form-group form-button">
                    <input
                      //type="submit"
                      name="signin"
                      id="signin"
                      className="form-submit"
                      value="Log in"
                      onClick={login}
                    />
                  </div>
                </form>
                <div className="social-login">
                  <span className="social-label">Or login with</span>
                  <ul className="socials">
                    <li>
                      <IconButton
                        href="#"
                        style={{ color: "white", backgroundColor: "#3498db" }}
                        onClick={() => {
                          setIsFbLoginClicked(true);
                        }}
                      >
                        <FacebookIcon />
                        {isFbLoginClicked && (
                          <FacebookLogin
                            appId="651836866034563"
                            autoLoad={true}
                            fields="name,email,picture"
                            callback={responseFacebook}
                            cssClass="btnFacebook"
                          />
                        )}
                      </IconButton>
                    </li>
                    {/* <li>
                    <a href="#">
                      <i className="display-flex-center zmdi zmdi-twitter"></i>
                    </a>
                  </li> */}
                    <li>
                      <GoogleLogin
                        clientId="979916986087-htd2ih5nfl2dovcrf4fdbpvt3v72aunu.apps.googleusercontent.com"
                        render={(renderProps) => (
                          <IconButton
                            href="#"
                            style={{
                              color: "white",
                              backgroundColor: "#ff1122",
                            }}
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            className="googleButton"
                          >
                            {/* <i className="display-flex-center zmdi zmdi-google"></i> */}
                            <GoogleIcon />
                          </IconButton>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy="single_host_origin"
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="signup">
          <div className="container">
            <div className="signup-content">
              <div className="signup-form">
                <h2 className="form-title">Sign up</h2>
                <form method="#" className="register-form" id="register-form">
                  <div className="form-group">
                    <label htmlFor="name">
                      {/* <i className="zmdi zmdi-account material-icons-name"></i> */}
                      <PersonIcon />
                    </label>
                    <input
                      defaultValue={signupCredentials.name}
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Your Name"
                      onChange={(e) =>
                        setSignupCredentials({
                          name: e.target.value,
                          email: signupCredentials.email,
                          password: signupCredentials.password,
                          cpassword: signupCredentials.cpassword,
                        })
                      }
                    />
                  </div>
                  {signupErrors.name && (
                    <h6 className="error__message">{signupErrors.name}</h6>
                  )}

                  <div className="form-group">
                    <label htmlFor="email">
                      {/* <i className="zmdi zmdi-email"></i> */}
                      <EmailIcon />
                    </label>
                    <input
                      defaultValue={signupCredentials.email}
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Your Email"
                      onChange={(e) =>
                        setSignupCredentials({
                          name: signupCredentials.name,
                          email: e.target.value,
                          password: signupCredentials.password,
                          cpassword: signupCredentials.cpassword,
                        })
                      }
                    />
                  </div>
                  {signupErrors.email && (
                    <h6 className="error__message">{signupErrors.email}</h6>
                  )}

                  <div className="form-group">
                    <label htmlFor="pass">
                      {/* <i className="zmdi zmdi-lock"></i> */}
                      <LockIcon />
                    </label>
                    <input
                      defaultValue={signupCredentials.password}
                      type="password"
                      name="pass"
                      id="pass"
                      placeholder="Password"
                      onChange={(e) =>
                        setSignupCredentials({
                          name: signupCredentials.name,
                          email: signupCredentials.email,
                          password: e.target.value,
                          cpassword: signupCredentials.cpassword,
                        })
                      }
                    />
                  </div>
                  {signupErrors.password && (
                    <h6 className="error__message">{signupErrors.password}</h6>
                  )}

                  <div className="form-group">
                    <label htmlFor="re-pass">
                      {/* <i className="zmdi zmdi-lock-outline"></i> */}
                      <LockIcon />
                    </label>
                    <input
                      defaultValue={signupCredentials.cpassword}
                      type="password"
                      name="re_pass"
                      id="re_pass"
                      placeholder="Repeat your password"
                      onChange={(e) =>
                        setSignupCredentials({
                          name: signupCredentials.name,
                          email: signupCredentials.email,
                          password: signupCredentials.password,
                          cpassword: e.target.value,
                        })
                      }
                    />
                  </div>
                  {signupErrors.cpassword && (
                    <h6 className="error__message">{signupErrors.cpassword}</h6>
                  )}

                  {/* <div className="form-group">
                    <input
                      type="checkbox"
                      name="agree-term"
                      id="agree-term"
                      className="agree-term"
                    />
                    <label htmlFor="agree-term" className="label-agree-term">
                      <span>
                        <span></span>
                      </span>
                      I agree all statements in{" "}
                      <a href="#" className="term-service">
                        Terms of service
                      </a>
                    </label>
                  </div> */}
                  <div className="form-group form-button">
                    <input
                      // type="submit"
                      name="signup"
                      id="signup"
                      className="form-submit"
                      value="Register"
                      onClick={signup}
                    />
                  </div>
                </form>
              </div>
              <div className="signup-image">
                <figure>
                  {/* <img src={signUpImage} alt="sing In image" /> */}
                  <img src={Logo} alt="sing In image" />
                </figure>
                <a
                  href="#"
                  className="signup-image-link"
                  onClick={() => setShowSignInForm(!showSignInForm)}
                >
                  I am already member
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default FormPage;
