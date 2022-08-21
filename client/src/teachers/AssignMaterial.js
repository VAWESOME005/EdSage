import React, { useState } from "react";
import "./AssignMaterial.css";
import { FormOutlined, FileAddOutlined } from "@ant-design/icons";
import { Select, Input, Checkbox } from "antd";
import db from "../firebase";
import { toast } from "react-toastify";

const { Option } = Select;
const { TextArea } = Input;

const AssignMaterial = ({ match, history }) => {
  const [assign, setAssign] = useState(0);
  const [type, setType] = useState(3);
  const [question, setQuestion] = useState("");
  const [correct, setCorrect] = useState("");
  const [choice, setChoice] = useState(1);
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState("");

  console.log(options);

  const handleAssign = async () => {
    await db.collection("assignments")
      .add({
        class: match.params.classId,
        question: question,
        answer: answer
      });
    toast.success('Material Successfully Posted!')
    setQuestion("")
    setAnswer("")
  };
  return (
    <div className="assignMaterial">
      {assign == 0 ? (
        <>
          <div className="assignMaterial__box" onClick={() => setAssign(1)}>
            <FormOutlined className="h1" />
            <h2>Try Our Question Assigner</h2>
          </div>
          <div>
            <div className="assignMaterial__orLine"></div>
            <h4>or</h4>
            <div className="assignMaterial__orLine"></div>
          </div>
          <div className="assignMaterial__box">
            <FileAddOutlined className="h1" />
            <h2>Upload Material</h2>
          </div>{" "}
        </>
      ) : assign == 1 ? (
        <>
          <Select
            defaultValue="3"
            style={{
              width: 200,
            }}
            onChange={(e) => setType(e)}
          >
            {/* <Option value="1">Multiple Choice</Option> */}
            <Option value="2">Short Answer</Option>
            <Option value="3">Paragraph</Option>
            {/* <Option value="4">Checkboxes</Option> */}
          </Select>
          <div className="assignMaterial__createCard">
            <input
              placeholder="Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <div className="assignMaterial__answer">
              {type == 2 ? (
                <TextArea
                  showCount
                  value={answer || ""}
                  onChange={(e) => setAnswer(e.target.value)}
                  maxLength={150}
                  style={{
                    height: 120,
                  }}
                />
              ) : type == 3 ? (
                <TextArea
                  showCount
                  maxLength={500}
                  style={{
                    height: 120,
                  }}
                />
              ) : null}
            </div>
          </div>
          <button onClick={handleAssign} className="btn btn-outline-danger assignMaterial__button">Assign</button>
          <button className="btn btn-outline-danger assignMaterial__button" onClick={()=> history.push('/teacher')} >Exit</button>
        </>
      ) : null}
    </div>
  );
};

export default AssignMaterial;
