import React from "react";
import Footer from "../../Components/Footer/Footer";
import "./About.css";
import aboutImage from "../../assets/images/header__bg__4.jpg";
import aboutImage2 from "../../assets/images/about2.jpg";

const About = () => {
  return (
    <>
      <div className="about">
        <div className="about__header">
          <h1>About US </h1>
        </div>

        <div className="what_we_beleive">
          <div>
            <h1>What We Beleive</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Exercitationem repellendus quis adipisci animi consequuntur
              asperiores, magnam ullam a iste aspernatur quidem consectetur
              quaerat pariatur vero porro voluptatibus eaque, voluptatum
              consequatur nostrum. Sunt nulla repellendus id architecto aliquid
              deleniti libero eius quia illo optio, eligendis exercitationem et,
              cupiditate rerum quibusdam autem repellat illo iste, modi iusto ab
              quasi illum expedita? Tempore, odit! Adipisci nostr
            </p>
          </div>
          <div className="image__container">
            <img src={aboutImage2} alt="about" />
          </div>
        </div>
        <div className="what_we_do">
          <div className="image__container">
            <img src={aboutImage} alt="about" />
          </div>
          <div>
            <h1>What we do</h1>

            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Exercitationem repellendus quis adipisci animi consequuntur
              asperiores, magnam ullam a iste aspernatur quidem consectetur
              quaerat pariatur vero porro voluptatibus eaque, voluptatum
              consequatur nostrum. Sunt nulla repellendus id architecto aliquid
              deleniti libero eius quia illo optio, eligendi vero quasi non
              cupiditate esse nemo, nam animi expedita iusto?
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
