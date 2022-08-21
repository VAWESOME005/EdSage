import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import db from "../firebase";

import "./TeacherDashboard.css";

import { Tabs, Modal } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const { TabPane } = Tabs;

const TeacherDashboard = ({ history }) => {
  const [code, setCode] = useState("");
  const [view, setView] = useState(0);
  const [room, setRoom] = useState("");
  const [classes, setClasses] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { auth } = useSelector((state) => ({ ...state }));

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    setClasses([]);
    try {
      db.collection("classes")
        .where("teacherId", "==", auth.teacher._id)
        .get()
        .then((docs) => {
          if (docs.empty) {
            setClasses([]);
          } else {
            docs.forEach((doc) => {
              const addClass = [doc.data(), doc.id];
              setClasses((oldArray) => [...oldArray, addClass]);
              //   console.log("DOC --->", doc.data());
            });
          }
        });
    } catch (err) {
      toast.error("Error fetching classes");
    }
  }, []);

  console.log(classes);

  const handleCreate = () => {
    if (name !== "" && description !== ""){
    function makeid(length) {
      var result = "";
      var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }

    try {
      db.collection("classes").add({
        className: name,
        classDesc: description,
        teacher: auth.teacher.name,
        teacherId: auth.teacher._id,
        code: makeid(6),
      });
      toast.success("Class create successfully!");
      setClasses("");
    } catch (err) {
      toast.error("Error");
    }
} else {
    toast.error("You must give a title and description to your class")
}
  };

  const handleJoin = () => {
    try {
      db.collection("classes")
        .where("code", "==", "VVVVVV")
        .onSnapshot((querySnapshot) => {
          if (querySnapshot.empty) {
            toast.error("incorrect");
          } else {
            // console.log(querySnapshot)
            //   setCode(querySnapshot.code)
            querySnapshot.forEach((doc) => {
              setCode(doc.data());
              setRoom(doc.id);
            });
          }
        });

      db.collection("classes").doc(room).collection("students").add({
        name: auth.teacher.name,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="teacherDashboard">
      <div className="teacherDashboard__container">
        <div>
          <h2 className="h2 teacherDashboard__name">{auth.teacher.name}</h2>
          <div className="d-flex">
            <div className="teacherDashboard__left">
              <h2 className="h2 teacherDashboard__title">Your Classes</h2>

              <button
                className="btn btn-outline-success teacherDashboard__active"
                onClick={() => setView(1)}
              >
                View Active Classes
              </button>
              <button
                className="btn btn-outline-secondary teacherDashboard__inactive"
                onClick={() => setView(2)}
              >
                View Archived Classes
              </button>
            </div>
            <div className="teacherDashboard__right">
              <div className="teacherDashboard__classesContainer">
                {classes.length !== 0 &&
                  classes.map((cls) => (
                    <div className="teacherDashboard__classBox">
                      <h6>
                        Join Code: <b>{cls[0].code}</b>
                      </h6>
                      <h1>{cls[0].className}</h1>
                      <p>{cls[0].classDesc}</p>
                      <div className="d-flex">
                        <button
                          className="btn btn-outline-danger teacherDashboard__classButton"
                          onClick={() =>
                            history.push(`/assign-material/${cls[1]}`)
                          }
                        >
                          <h6 className="h6">Assign Material</h6>
                        </button>
                        <button className="btn btn-outline-danger teacherDashboard__classButton">
                          <h6 className="h6">Manage Class</h6>
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
          Create Class +
        </button>
        <Modal
          title="Create Class"
          visible={isModalVisible}
          onOk={handleCreate}
          onCancel={handleCancel}
        >
          <div className="teacherDashboard__createDetails">
            <input
              placeholder="Name Your Class"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Description"
              type="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default TeacherDashboard;
