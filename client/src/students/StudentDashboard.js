import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import db from "../firebase";
import "./StudentDashboard.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import { Tabs, Button, Modal } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const { TabPane } = Tabs;

const StudentDashboard = ({ history }) => {
  const [code, setCode] = useState("");
  const [view, setView] = useState(0);
  const [room, setRoom] = useState("");
  const [classes, setClasses] = useState([]);
  const [classData, setClassData] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { auth } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    setClasses([]);
    try {
      db.collection("students")
        .where("id", "==", auth.teacher._id)
        .get()
        .then((docs) => {
          if (docs.empty) {
            setClasses([]);
          } else {
            docs.forEach((doc) => {
              console.log("IDDDD --->", doc.data().class);
              // const addClass = [doc.data(), doc.id];
              //   setClasses((oldArray) => [...oldArray, addClass]);
              db.collection("classes")
                .doc(doc.data().class)
                .get()
                .then((cls) => {
                  if (cls.empty) {
                    setClasses([]);
                  } else {
                    // clss.forEach((cls) => {
                    const addClass = [cls.data(), cls.id];
                    setClasses((oldArray) => [...oldArray, addClass]);
                    // });
                  }
                });
              //   console.log("DOC --->", doc.data());
            });
          }
        });

      db.collection("classes").doc();
    } catch (err) {
      toast.error("Error fetching classes");
    }
  }, []);

  console.log("CLS", classes);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleJoin = async () => {
    try {
      db
        .collection("classes")
        .where("code", "==", code)
        .onSnapshot((querySnapshot) => {
          if (querySnapshot.empty) {
            toast.error("incorrect");
          } else {
            // console.log(querySnapshot)
            //   setCode(querySnapshot.code)
            querySnapshot.forEach((doc) => {
              setClassData(doc.data());
              setRoom(doc.id);
            });
          }
        });

     setTimeout(() => {
        db.collection("students").add({
            name: auth.teacher.name,
            id: auth.teacher._id,
            class: room,
          });
     }, 2000);
    } catch (err) {
      console.log(err);
    }

    setIsModalVisible(false);
    setCode("");
  };
  return (
    <div className="studentDashboard">
      <div className="studentDashboard__container">
        <div>
          <h2 className="h2 studentDashboard__name">{auth.teacher.name}</h2>
          <div className="d-flex">
            <div className="studentDashboard__left">
              <h2 className="h2 studentDashboard__title">Your Classes</h2>

              <button
                className="btn btn-outline-success studentDashboard__active"
                onClick={() => setView(1)}
              >
                View Active Classes
              </button>
              <button
                className="btn btn-outline-secondary studentDashboard__inactive"
                onClick={() => setView(2)}
              >
                View Archived Classes
              </button>
            </div>
            <div className="studentDashboard__right">
              <div className="studentDashboard__classesContainer">
                {classes.map((cls) => (
                  <div className="studentDashboard__classBox">
                    <h1>{cls[0].className}</h1>
                    <p>{cls[0].classDesc}</p>
                    <div className="d-flex">
                      <button
                        className="btn btn-outline-danger studentDashboard__classButton"
                        onClick={() => history.push(`/view-material/${cls[1]}`)}
                      >
                        <h6 className="h6">View Material</h6>
                      </button>
                    </div>
                  </div>
                ))}{" "}
              </div>
            </div>
          </div>
        </div>
        <button
          className="btn btn-outline-danger studentDashboard__sideButton"
          onClick={showModal}
        >
          Join a Class
        </button>
        <Modal
          title="Join Class"
          visible={isModalVisible}
          onOk={handleJoin}
          onCancel={handleCancel}
        >
          <input
            placeholder="Enter 6-Digit Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </Modal>
      </div>
    </div>
  );
};
export default StudentDashboard;
