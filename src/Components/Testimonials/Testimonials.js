import React, { useState } from "react";
import "./Testimonials.css";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Testimonials = () => {
  const [testimonialData, setTestimonialData] = useState(testimonials[0]);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  let idx = 0;

  function updateTestimonial() {
    idx++;

    if (idx > testimonials.length - 1) {
      idx = 0;
    }

    setTestimonialData(testimonials[idx]);
    console.log("idx", idx);
  }

  setInterval(updateTestimonial, 5000);

  return (
    <div className="home__winner__testimonial">
      <h1>Testimonials</h1>
      <div class="testimonial-container">
        <div class="progress__bar"></div>
        <div class="fas fa-quote-right fa-quote">
          <FormatQuoteIcon />
        </div>
        <div class="fas fa-quote-left fa-quote">
          <FormatQuoteIcon />
        </div>
        <TestimonialDataBox
          text={testimonialData?.text}
          photo={testimonialData?.photo}
          name={testimonialData?.name}
          position={testimonialData?.position}
        />
      </div>
    </div>
  );
};
const TestimonialDataBox = ({ text, photo, name, position }) => {
  return (
    <>
      <p class="testimonial">{text}</p>
      <div class="user">
        <img src={photo} alt="" class="user-img" />
        <div class="user-details">
          <h4 class="username">{name}</h4>
          <p class="role">{position}</p>
        </div>
      </div>
    </>
  );
};

const testimonials = [
  {
    name: "june cha",
    position: "software engineer",
    photo: "https://randomuser.me/api/portraits/men/46.jpg",
    text: "p1et consectetur, adipisicing elit. Nostrum incidunt, vero harum quidem asperiores nemo quisquam ullam minus quo cupiditate illo, id cumque. Sed recusandae repellendus voluptatibus atque dicta ut, maiores iure dignissimos alias eveniet eum vero, voluptate omnis et rem. Dignissimos alias unde voluptas accusamus, mollitia earum praesentium tenetur ad ratione voluptatem possimus nam amet autem excepturi totam officiis aspernatur, ex labore omnis voluptatibus, quis eius corporis atque provident? Repellendus nemo officia porro nulla placeat fugit recusanue",
  },
  {
    name: "alsa poo",
    position: "data entry",
    photo: "https://randomuser.me/api/portraits/women/76.jpg",
    text: "p2  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum incidunt, vero harum quidem asperiores nemo quisquam ullam minus quo cupiditate illo, id cumque. Sed recusandae repellendus voluptatibus atque dicta ut, maiores iure dignissimos alias eveniet eum vero, voluptate omnis et rem. Dignissimos alias unde voluptas accusamus, mollitia earum praesentium tenetur ad ratione voluptatem possimus nam amet autem excepturi totam officiis aspernatur, ex labore omnis voluptatibus, quis eius corporis atque provident? Repellendus nemo officia porro nulla placeat fugit recusandae nisi neque",
  },
  {
    name: "abraham",
    position: "junior developer",
    photo: "https://randomuser.me/api/portraits/men/12.jpg",
    text: "p3  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum incidunt, vero harum quidem asperiores nemo quisquam ullam minus quo cupiditate illo, id cumque. Sed recusandae repellendus voluptatibus atque dicta ut, maiores iure dignissimos alias eveniet eum vero, voluptate omnis et rem. Dignissimos alias unde voluptas accusamus, mollitia earum praesentium tenetur ad ratione voluptatem possimus nam amet autem excepturi totam officiis aspernatur, ex labore omnis voluptatibus, quis eius corporis atque provident? Repellendus nemo officia porro nulla placeat fugit recusandae nisi neque",
  },
  {
    name: "sheema soui",
    position: "Graphic designer",
    photo: "https://randomuser.me/api/portraits/women/33.jpg",
    text: "p4  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum incidunt, vero harum quidem asperiores nemo quisquam ullam minus quo cupiditate illo, id cumque. Sed recusandae repellendus voluptatibus atque dicta ut, maiores iure dignissimos alias eveniet eum vero, voluptate omnis et rem. Dignissimos alias unde voluptas accusamus, mollitia earum praesentium tenetur ad ratione voluptatem possimus nam amet autem excepturi totam officiis aspernatur, ex labore omnis voluptatibus, quis eius corporis atque provident? Repellendus nemo officia porro nulla placeat fugit recusandae nisi neque",
  },
  {
    name: "ikvaar jon",
    position: "sweeeper",
    photo: "https://randomuser.me/api/portraits/men/54.jpg",
    text: "p5  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum incidunt, vero harum quidem asperiores nemo quisquam ullam minus quo cupiditate illo, id cumque. Sed recusandae repellendus voluptatibus atque dicta ut, maiores iure dignissimos alias eveniet eum vero, voluptate omnis et rem. Dignissimos alias unde voluptas accusamus, mollitia earum praesentium tenetur ad ratione voluptatem possimus nam amet autem excepturi totam officiis aspernatur, ex labore omnis voluptatibus, quis eius corporis atque provident? Repellendus nemo officia porro nulla placeat fugit recusandae nisi neque",
  },
];

export default Testimonials;
