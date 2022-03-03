import React, { useEffect, useState } from "react";
import { gsap, Quart } from "gsap";

const RaffleEndCountdown = ({ EndTime }) => {
  let days = document.querySelector(".days");
  let hours = document.querySelector(".hours");
  let minutes = document.querySelector(".minutes");
  let seconds = document.querySelector(".seconds");

  let timeLeft = {
    d: 3,
    h: 44,
    m: 5,
    s: 2,
  };

  let totalSeconds;
  useEffect(() => {
    days = document.querySelector(".days");
    hours = document.querySelector(".hours");
    minutes = document.querySelector(".minutes");
    seconds = document.querySelector(".seconds");
    totalSeconds = Math.floor(
      (new Date(new Date(EndTime).toISOString().split("T")[0]) - new Date()) /
        1000
    );
    setTimeLeft();
    let interval = setInterval(() => {
      if (totalSeconds < 0) {
        clearInterval(interval);
      }
      countTime();
    }, 1000);
  }, []);
  function init() {}

  function countTime() {
    if (totalSeconds > 0) {
      --timeLeft.s;
      if (timeLeft.m >= 0 && timeLeft.s < 0) {
        timeLeft.s = 59;
        --timeLeft.m;
        if (timeLeft.h >= 0 && timeLeft.m < 0) {
          timeLeft.m = 59;
          --timeLeft.h;
          if (timeLeft.d >= 0 && timeLeft.h < 0) {
            timeLeft.h = 23;
            --timeLeft.d;
          }
        }
      }
    }
    --totalSeconds;
    printTime();
  }

  function printTime() {
    animateFlip(days, timeLeft.d);
    animateFlip(hours, timeLeft.h);
    animateFlip(minutes, timeLeft.m);
    animateFlip(seconds, timeLeft.s);
  }

  function animateFlip(element, value) {
    const valueInDom = element?.querySelector(".bottom-back").innerText;
    const currentValue = value < 10 ? "0" + value : "" + value;

    if (valueInDom === currentValue) return;

    if (element !== null) {
      element.querySelector(".top-back span").innerText = currentValue;
      element.querySelector(".bottom-back span").innerText = currentValue;
      gsap.to(element.querySelector(".top"), 0.7, {
        rotationX: "-180deg",
        transformPerspective: 300,
        ease: Quart.easeOut,
        onComplete: function () {
          element.querySelector(".top").innerText = currentValue;
          element.querySelector(".bottom").innerText = currentValue;
          gsap.set(element.querySelector(".top"), { rotationX: 0 });
        },
      });

      gsap.to(element.querySelector(".top-back"), 0.7, {
        rotationX: 0,
        transformPerspective: 300,
        ease: Quart.easeOut,
        clearProps: "all",
      });
    }
  }

  function setTimeLeft() {
    timeLeft.d = Math.floor(totalSeconds / (60 * 60 * 24));
    timeLeft.h = Math.floor((totalSeconds / (60 * 60)) % 24);
    timeLeft.m = Math.floor((totalSeconds / 60) % 60);
    timeLeft.s = Math.floor(totalSeconds % 60);
  }

  return (
    <div className="raffle__end__countdown">
      <div class="countdown">
        <div class="countdown-block">
          <span class="days time-elem">
            <span class="top">00</span>
            <span class="top-back">
              <span>00</span>
            </span>
            <span class="bottom">00</span>
            <span class="bottom-back">
              <span>00</span>
            </span>
          </span>
          <span class="title">Days</span>
        </div>

        <div class="countdown-block">
          <span class="hours time-elem">
            <span class="top">00</span>
            <span class="top-back">
              <span>00</span>
            </span>
            <span class="bottom">00</span>
            <span class="bottom-back">
              <span>00</span>
            </span>
          </span>
          <span class="title">Hours</span>
        </div>

        <div class="countdown-block">
          <span class="minutes time-elem">
            <span class="top">00</span>
            <span class="top-back">
              <span>00</span>
            </span>
            <span class="bottom">00</span>
            <span class="bottom-back">
              <span>00</span>
            </span>
          </span>
          <span class="title">Minutes</span>
        </div>

        <div class="countdown-block">
          <span class="seconds time-elem">
            <span class="top">00</span>
            <span class="top-back">
              <span>00</span>
            </span>
            <span class="bottom">00</span>
            <span class="bottom-back">
              <span>00</span>
            </span>
          </span>
          <span class="title">Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default RaffleEndCountdown;
