import React from "react";
import "./LandingPage.css";

import LandingPageImage from "./images/LandingPage.png";

const LandingPage = () => {
  return (
    <div className="bg-white">
      <div className="landingPage__container">
        <div className="landingPage__textContainer">
          <div className="landingPage__text">
            We are <div className="landingPage__miniText">EdSage</div> Teaching made easier.
          </div>
        </div>

        <div className="landingPage__Image">
          <img src={LandingPageImage} alt = "Image" />
        </div>
      </div>

      <div className="landingPage__boxesTitle">How it Works</div>

      <div className="landingPage__boxContainer">
        <div className="landingPage__boxes">
          <div className="landingPage__miniContainer">
            <h1 className="landingPage__boxNumber">01</h1>
          </div>
          <div className="landingPage__textDes">
            Begin by registering with us and knowing what class you want to
            create.
          </div>
        </div>

        <div className="landingPage__boxes">
          <div className="landingPage__miniContainer">
            <h1 className="landingPage__boxNumber">02</h1>
          </div>
          <div className="landingPage__textDes">
            Then create your class and show your students the join code
          </div>
        </div>

        <div className="landingPage__boxes">
          <div className="landingPage__miniContainer">
            <h1 className="landingPage__boxNumber">03</h1>
          </div>
          <div className="landingPage__textDes">
            Ask them to register and join your class using the code.
          </div>
        </div>
      </div>

      <div className="landingPage__boxContainer">
        <div className="landingPage__boxes">
          <div className="landingPage__miniContainer">
            <h1 className="landingPage__boxNumber">04</h1>
          </div>
          <div className="landingPage__textDes">
            Assign Material/Q and A questions for them to look at.
          </div>
        </div>

        <div className="landingPage__boxes">
          <div className="landingPage__miniContainer">
            <h1 className="landingPage__boxNumber">05</h1>
          </div>
          <div className="landingPage__textDes">
            Let your students know that the materials are there and you're all
            done!
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
