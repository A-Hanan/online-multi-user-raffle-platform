import React, { useRef, useState } from "react";
import "./ContactUs.css";
import emailjs from "@emailjs/browser";
import Logo from "../../assets/images/logo.png";
import Footer from "../../Components/Footer/Footer";

const ContactUs = () => {
  const [result, showResult] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_hytl58m",
        "template_jtbskdc",
        form.current,
        "user_21nLtd6UvruM2nYbqbHhY"
      )
      .then(
        (result) => {
          console.log(result.text);
          showResult(true);
          setTimeout(() => {
            showResult(false);
            form.current.reset();
          }, 5000);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    /*<div className="contact">
      <form ref={form} onSubmit={sendEmail} className="contact__form">
        <h1>Contact Us</h1>
        <h5>Name</h5>
        <input type="text" name="user_name" />
        <h5>Email</h5>
        <input type="email" name="user_email" />
        <h5>Message</h5>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
      <div className="contact__sidebar">
          <img src={Logo} alt='Logo'/>
      </div>
    </div>*/
    <>
      <div class="contact__container">
        <div class="form-container">
          <div class="left-container">
            <div class="left-inner-container">
              <h2>Let's Chat</h2>
              <p>
                Whether you have anything worth discussion or a business
                proposal
              </p>
              <br />
              <p>Feel free to send us a message in the contact form</p>
              {/* <img src={Logo} alt="Logo" /> */}
            </div>
          </div>
          <div class="right-container">
            <div class="right-inner-container">
              <form ref={form} onSubmit={sendEmail} className="contact__form">
                <h2 class="lg-view">Contact</h2>
                <h2 class="sm-view">Let's Chat</h2>
                <p>* Required</p>
                <div class="social-container">
                  <a href="#" class="social">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" class="social">
                    <i class="fab fa-google-plus-g"></i>
                  </a>
                  <a href="#" class="social">
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                </div>
                <input
                  type="text"
                  placeholder="Name *"
                  name="user_name"
                  required
                />
                <input
                  type="email"
                  placeholder="Email *"
                  name="user_email"
                  required
                />
                <textarea
                  rows="4"
                  placeholder="Message *"
                  name="message"
                  required
                ></textarea>
                {result ? (
                  <button disabled>Submit</button>
                ) : (
                  <button>Submit</button>
                )}

                {result && (
                  <p className="result__para">
                    your message submitted successfully. We will reply to it
                    soon.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default ContactUs;
