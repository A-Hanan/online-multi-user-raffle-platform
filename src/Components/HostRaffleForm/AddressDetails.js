import React, { Component, useEffect, useState } from "react";
import {
  Form,
  Button,
  Col,
  Container,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";

const AddressDetails = ({
  nextStep,
  prevStep,
  handleChange,
  inputValues,
  errors,
}) => {
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("seller");
  const [feePayer, setFeePayer] = useState("Buyer");
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    const e = {
      target: {
        name: "agreeTerms",
        value: agree,
      },
    };
    handleChange(e);
  }, [agree]);

  const back = (e) => {
    e.preventDefault();
    prevStep();
  };

  const saveAndContinue = (e) => {
    e.preventDefault();
    nextStep();
  };

  const checkboxHandler = () => {
    /*if agree === true, it will be set to false
     if agree === false, it will be set to true*/
    setAgree(!agree);
 
  };

  return (
    <Container>
      <Form>
        <Form.Group as={Col} controlId="city">
          <Form.Label>Enter City</Form.Label>
          <Form.Control
            type="text"
            defaultValue={inputValues?.city}
            name="city"
            required
            onChange={handleChange}
          />
          {errors.city && <p className="error__para">{errors.city}</p>}
        </Form.Group>
        <Form.Group as={Col} controlId="address">
          <Form.Label>Enter Your Address</Form.Label>
          <Form.Control
            type="text"
            defaultValue={inputValues?.address}
            name="address"
            required
            onChange={handleChange}
          />
          {errors.address && <p className="error__para">{errors.address}</p>}
        </Form.Group>
        {/* <Form.Row> */}
        <Form.Group as={Col} controlId="phone">
          <Form.Label>Enter your Phone No.</Form.Label>
          <Form.Control
            type="text"
            defaultValue={inputValues?.phone}
            name="phone"
            required
            onChange={handleChange}
          />
          {errors.phone && <p className="error__para">{errors.phone}</p>}
        </Form.Group>
        <Form.Group as={Col} controlId="zip">
          <Form.Label>Zip</Form.Label>
          <Form.Control
            type="text"
            defaultValue={inputValues?.zip}
            name="zip"
            required
            onChange={handleChange}
          />
          {errors.zip && <p className="error__para">{errors.zip}</p>}
        </Form.Group>
        <Form.Group as={Col} controlId="feeBearer">
          <Form.Label>Who will pay the shopping fee</Form.Label>
          <div>
            {/* <ButtonGroup className="radio__btns">
              {radios?.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant={
                    radioValue == radio.value ? "outline-success" : "contained"
                  }
                  name={idx == 0 ? "Buyer" : "Seller"}
                  value={radio?.value}
                  checked={radioValue === radio?.value}
                  onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                  {radio?.name}
                </ToggleButton>
              ))}
            </ButtonGroup> */}
            <div className="radio__buttons">
              <div>
                <input
                  type="radio"
                  value="buyer"
                  name="feePayer"
                  onClick={(e) => {
                    let ev = { target: { name: "feeBearer", value: "buyer" } };
                    handleChange(ev);
                  }}
                />{" "}
                <span class="checkmark"></span>
                Buyer
              </div>
              <div>
                {" "}
                <input
                  type="radio"
                  value="seller"
                  name="feePayer"
                  onClick={(e) => {
                    let ev = { target: { name: "feeBearer", value: "seller" } };
                    handleChange(ev);
                  }}
                />{" "}
                Seller
                <span class="checkmark"></span>
              </div>
            </div>
          </div>
        </Form.Group>
        <Form.Group as={Col}>
          <div
            classame="agreeTerms__container"
            style={{
              display: "flex",
              alignItems: "center",
              height: "60px",
            }}
          >
            <input
              style={{
                background: "black",
                display: "inline",
                marginTop: "10px !important",
                height: "15px",
                borderRadius: "50%",
              }}
              type="checkbox"
              id="agree"
              className="agreeTerms__checkbox"
              onChange={checkboxHandler}
            />

            <h6 htmlFor="agree" style={{ marginTop: "-5px" }}>
              I agree to <b>terms and conditions</b>
            </h6>
          </div>
          {errors.agreeTerms && (
            <p className="error__para">{errors.agreeTerms}</p>
          )}
        </Form.Group>
        {/* </Form.Row> */}
        <Button variant="secondary" onClick={back}>
          Back
        </Button>{" "}
        <Button variant="primary" onClick={(e) => saveAndContinue(e)}>
          Next
        </Button>
      </Form>
    </Container>
  );
};

export default AddressDetails;
