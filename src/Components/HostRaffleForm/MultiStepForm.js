import React, { Component, useState, useEffect } from "react";
import UserDetails from "./UserDetails";
import AddressDetails from "./AddressDetails";
import Confirmation from "./Confirmation";

const MultiStepForm = ({ isEditing, raffleValues }) => {
  const [step, setStep] = useState(1);
  const [inputValues, setInputValues] = useState({
    title: "",
    description: "",
    image: "",
    category: "Appliances",
    ticketValue: "0.10",
    numberOfTickets: "10",
    expiryDate: "",
    address: "",
    city: "",
    phone: "",
    zip: "",
    agreeTerms: "",
    feeBearer: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    image: "",
    expiryDate: "",
    address: "",
    city: "",
    agreeTerms: "",
    phone: "",
    zip: "",
  });

  useEffect(() => {
    if (isEditing === true && raffleValues) {
      setInputValues(raffleValues);
      console.log("is editing", raffleValues);
    }
  }, [raffleValues]);

  const checkErrorsInForm1 = () => {
    let error = false;
    if (inputValues.title == "") {
      setErrors((prev) => ({
        ...prev,
        title: "must fill the title field",
      }));
      error = true;
    }
    if (inputValues.description == "") {
      setErrors((prev) => ({
        ...prev,
        description: "must fill the description field",
      }));
      error = true;
    } else if (inputValues.description.length < 20) {
      setErrors((prev) => ({
        ...prev,
        description: "description should have minimum 20 chrachters",
      }));
      error = true;
    }
    if (inputValues.image == "") {
      setErrors((prev) => ({
        ...prev,
        image: "must select an image",
      }));
      error = true;
    }
    /******validating expiry date */
    let date = new Date();
    if (inputValues.expiryDate < date) {
      setErrors((prev) => ({
        ...prev,
        expiryDate: "must choose corect date",
      }));
      error = true;
    }

    if (error == true) {
      return true;
    }
    return false;
  };
  const checkErrorsInForm2 = () => {
    let error = false;

    if (inputValues.zip == "") {
      setErrors((prev) => ({
        ...prev,
        zip: "must fill the zip field",
      }));
      error = true;
    }
    if (inputValues.address == "") {
      setErrors((prev) => ({
        ...prev,
        address: "must fill the address field",
      }));
      error = true;
    }

    if (inputValues.phone == "") {
      setErrors((prev) => ({
        ...prev,
        phone: "must fill the phone field",
      }));
      error = true;
    }
    if (inputValues.city == "") {
      setErrors((prev) => ({
        ...prev,
        city: "must fill the city field",
      }));
      error = true;
    }
    if (inputValues.agreeTerms == false) {
      setErrors((prev) => ({
        ...prev,
        agreeTerms: "Accept terms and conditions to move forward",
      }));
      error = true;
    }

    if (error == true) {
      return true;
    }
    return false;
  };
  const nextStep = () => {
    setErrors({});

    if (step == 1) {
      let isError = checkErrorsInForm1();
      isError ? console.log("errors", errors) : setStep(step + 1);
    } else {
      let isError = checkErrorsInForm2();
      isError ? console.log("errors", errors) : setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (event) => {
    setInputValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setTimeout(() => {}, [500]);
  };

  switch (step) {
    case 1:
      return (
        <UserDetails
          nextStep={nextStep}
          handleChange={handleChange}
          inputValues={inputValues}
          errors={errors}
        />
      );
    case 2:
      return (
        <AddressDetails
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          inputValues={inputValues}
          errors={errors}
        />
      );
    case 3:
      return (
        <Confirmation
          nextStep={nextStep}
          prevStep={prevStep}
          inputValues={inputValues}
        />
      );
  }
};

export default MultiStepForm;
