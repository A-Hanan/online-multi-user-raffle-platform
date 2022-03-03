import React, { Component, useState, useEffect } from "react";
import { Form, Button, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UserDetails = ({ nextStep, handleChange, inputValues, errors }) => {
  const [prizeImage, setPrizeImage] = useState();
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    inputValues._id && setPrizeImage(inputValues.image);
  }, []);
  const back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  const saveAndContinue = (e) => {
    e.preventDefault();
    nextStep();
  };

  const uploadFile = async (e) => {
    console.log("running upload file ");
    let files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "iamluckyticket");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dosfquxpc/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setPrizeImage(file.secure_url);
    let e2 = { target: { name: "image", value: file.secure_url } };
    handleChange(e2);
    console.log("file>>> ", file);
    // handleChange();
  };

  return (
    <div>
      <Container>
        <Form>
          {/* <Form.Row> */}
          <h1>Create Your own Raffle</h1>
          <Form.Group as={Col} controlId="title">
            <br />
            <Form.Label className="label">Ad Title</Form.Label>
            <Form.Control
              type="text"
              defaultValue={inputValues?.title}
              name="title"
              required
              onChange={handleChange}
            />
            {errors.title && <p className="error__para">{errors.title}</p>}
          </Form.Group>

          <Form.Group as={Col} controlId="description">
            <br />
            <Form.Label className="label">Ad Description</Form.Label>
            <Form.Control
              type="text"
              defaultValue={inputValues?.description}
              name="description"
              required
              onChange={handleChange}
            />
            {errors.description && (
              <p className="error__para">{errors.description}</p>
            )}
          </Form.Group>
          {/* </Form.Row> */}

          <Form.Group as={Col} controlId="image">
            <br />
            <Form.Label className="label" style={{ display: "block" }}>
              Prize Image
            </Form.Label>
            {prizeImage && (
              <img
                src={prizeImage}
                alt="prize image"
                height="100px"
                width="150px"
                style={{ margin: "50px 0px" }}
              />
            )}
            <Form.Control
              type="file"
              name="image"
              required
              onChange={(e) => uploadFile(e)}
            />
            {errors.image && <p className="error__para">{errors.image}</p>}
          </Form.Group>

          <Form.Group controlId="category">
            <br />
            <Form.Label className="label">Category</Form.Label>

            <Form.Control
              as="select"
              name="category"
              defaultValue={inputValues.category}
              onChange={handleChange}
            >
              <option value="Appliances">Appliances</option>
              <option value="Apps & Games">Apps & Games</option>
              <option value="Arts, Crafts, & Sewing">
                Arts, Crafts, & Sewing
              </option>
              <option value="Automotive Parts & Accessories">
                Automotive Parts & Accessories
              </option>
              <option value="Baby">Baby</option>
              <option value="Beauty & Personal Care">
                Beauty & Personal Care
              </option>
              <option value="Books">Books</option>
              <option value="CDs & Vinyl">CDs & Vinyl</option>
              <option value="Cell Phones & Accessories">
                Cell Phones & Accessories
              </option>
              <option value="Clothing, Shoes and Jewelry">
                Clothing, Shoes and Jewelry
              </option>
              <option value="Collectibles & Fine Art">
                Collectibles & Fine Art
              </option>
              <option value="Computers">Computers</option>
              <option value="Electronics">Electronics</option>
              <option value="Garden & Outdoor">Garden & Outdoor</option>
              <option value="Grocery & Gourmet Food">
                Grocery & Gourmet Food
              </option>
              <option value="Handmade">Handmade</option>
              <option value="Health, Household & Baby Care">
                Health, Household & Baby Care
              </option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              <option value="Industrial & Scientific">
                Industrial & Scientific
              </option>
              <option value="Luggage & Travel Gear">
                Luggage & Travel Gear
              </option>
              <option value="Movies & TV">Movies & TV</option>
              <option value="Musical Instruments">Musical Instruments</option>
              <option value="Office Products">Office Products</option>
              <option value="Pet Supplies">Pet Supplies</option>
              <option value="Sports & Outdoors">Sports & Outdoors</option>
              <option value="Tools & Home Improvement">
                Tools & Home Improvement
              </option>
              <option value="Toys & Games">Toys & Games</option>
              <option value="Video Games">Video Games</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="ticketValue">
            <br />
            <Form.Label className="label" style={{ display: "block" }}>
              Price per Ticket
            </Form.Label>
            {/* <Form.Control
              type="text"
              defaultValue={inputValues?.ticketValue}
              name="ticketValue"
              required
              onChange={handleChange}
            /> */}
            <Form.Control
              as="select"
              name="ticketValue"
              defaultValue={inputValues.ticketValue}
              onChange={handleChange}
              style={{ width: "20vw", display: "inline" }}
            >
              <option value="0.10">0.10</option>
              <option value="0.20">0.20</option>
              <option value="0.40">0.40</option>
              <option value="0.70">0.70</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="60">60</option>
              <option value="80">80</option>
              <option value="100">100</option>
              <option value="130">130</option>
              <option value="160">160</option>
              <option value="200">200</option>
              <option value="250">250</option>
              <option value="300">300</option>
              <option value="350">350</option>
              <option value="400">400</option>
              <option value="500">500</option>
              <option value="600">600</option>
              <option value="700">700</option>
              <option value="800">800</option>
              <option value="900">900</option>
              <option value="1000">1000</option>
            </Form.Control>
            <b> $</b>
          </Form.Group>
          <Form.Group controlId="numberOfTickets">
            <br />
            <Form.Label className="label" style={{ display: "block" }}>
              Set numbers of ticket to be issued
            </Form.Label>

            {/* <Form.Control
              type="text"
              defaultValue={inputValues?.numberOfTickets}
              name="numberOfTickets"
              required
              onChange={handleChange}
            /> */}
            <Form.Control
              as="select"
              name="numberOfTickets"
              defaultValue={inputValues.numberOfTickets}
              onChange={handleChange}
              style={{ width: "20vw", display: "inline" }}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="150">150</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="600">600</option>
              <option value="800">800</option>
              <option value="1000">1000</option>
              <option value="1300">1300</option>
              <option value="1600">1600</option>
              <option value="2000">2000</option>
              <option value="2500">2500</option>
              <option value="3000">3000</option>
              <option value="3500">3500</option>
              <option value="4000">4000</option>
              <option value="5000">5000</option>
              <option value="6000">6000</option>
              <option value="7000">7000</option>
              <option value="8000">8000</option>
              <option value="9000">9000</option>
              <option value="10000">10000</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="expiryDate">
            <br />
            <Form.Label className="label">Expiry Date of Raffle</Form.Label>
            {/* <Form.Control
              type="text"
              defaultValue={inputValues?.lastName}
              name="lastName"
              required
              onChange={handleChange}
            /> */}
            <div style={{ display: "flex", height: "50px" }}>
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  let e = {
                    target: {
                      name: "expiryDate",
                      value: date,
                    },
                  };
                  handleChange(e);
                }}
              />
            </div>
            {errors.expiryDate && (
              <p className="error__para">{errors.expiryDate}</p>
            )}
          </Form.Group>

          <Button variant="primary" onClick={(e) => saveAndContinue(e)}>
            Next
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default UserDetails;
