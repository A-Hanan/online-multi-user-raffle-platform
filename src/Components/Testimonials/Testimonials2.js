import React from "react";
import "./Testimonials2.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
import Avatar from "@mui/material/Avatar";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

const Testimonials2 = () => {
  return (
    <div className="testimonials__container">
      <h1>TESTIMONIALS</h1>
      <Splide
        options={{
          rewind: true,
          width: 1300,
          gap: "1rem",
          perPage: 1,
          interval: 5000,
          autoplay: "play",
          breakpoints: {
            760: {
              perPage: 1,
              interval: 3000,
            },
          },
        }}
      >
        {testimonials.map((tsm) => (
          <SplideSlide>
            <div class="testimonial">
              {/* <div class="progress__bar"></div> */}

              <TestimonialDataBox
                text={tsm?.text}
                photo={tsm?.photo}
                name={tsm?.name}
                position={tsm?.position}
              />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default Testimonials2;
const TestimonialDataBox = ({ text, photo, name, position }) => {
  return (
    <>
      <div class="user">
        <img src={photo} alt="" class="user-img" />
        <div class="user-details">
          <h4 class="username">{name}</h4>
          {/* <p class="role">{position}</p> */}
        </div>
      </div>
      <p class="testimonial__text">
        <FormatQuoteIcon />

        {text}
      </p>
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
    text: "p3  Lorem ipsum dolor sit e",
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
    text: "p5  Lorem ipsum dol amet consectetur, adie",
  },
];
