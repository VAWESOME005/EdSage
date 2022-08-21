import React, { useEffect, useState } from "react";
import db from "../firebase";
import "./ViewMaterial.css";

const ViewMaterial = ({ match }) => {
  const [material, setMaterial] = useState([]);


  useEffect(() => {
    db.collection("assignments")
      .where("class", "==", match.params.classId)
      .get()
      .then((docs) => {
        if (docs.empty) {
          setMaterial([]);
        } else {
          docs.forEach((doc) => {
            setMaterial((oldArray) => [...oldArray, doc.data()]);
          });
        }
      });
  }, []);
  return (
    <div className="viewMaterial">
      {material.length == 0 && <h1>No Material Posted Yet</h1>}
      {material.map((mtrl, idx) => (
        <>
          <div className="viewMaterial__card">
            <h3>Question: {mtrl.question}</h3>
            <h6>Answer: {mtrl.answer}</h6>
          </div>
        </>
      ))}{" "}
    </div>
  );
};

export default ViewMaterial;
