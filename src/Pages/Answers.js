import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, onValue, update } from "firebase/database";
import { getDatabase } from "firebase/database";
import Navbar from "./navbar";
import "./Answers.css";
import {auth} from "../firebase";
import { UserAuth } from './AuthContext';
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getDatabase();

const Answers = () => {

  const currentUser = auth.currentUser;
  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [userReply, setUserReply] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [userEdit, setUserEdit] = useState("");
  // const auth = getAuth();
  // const user = auth.currentUser;
  // const userDocRef = doc(db, "Users", user.uid);
  // const userDoc = getDoc(userDocRef);
  // const rollno = userDoc.data().rollno;
  // console.log(rollno);



  const getUserData = (event) => {
    const { value } = event.target;
    setUserReply(value);
  };

  const editUserData = (event) => {
    const { value } = event.target;
    setUserEdit(value);
  };


  const addReply = () => {
    if (userReply !== "") {
      const newAnswers = [...answers, { answer: userReply, userEmail: currentUser.email }];
      const questionRef = ref(db, `Questions/${questionId}`);
      update(questionRef, { answers: newAnswers });
      setAnswers(newAnswers);
      setUserReply("");
    } else {
      alert("Empty fields are not allowed!")
    }
  };
  
  const editAnswer = (index) => {
    setEditIndex(index);
    setUserEdit(answers[index].answer);
  };

  const saveAnswer = () => {
    const newAnswers = [...answers];
    newAnswers[editIndex] = {
      answer: userReply,
      userEmail: currentUser.email,
    };
    const questionRef = ref(db, `Questions/${questionId}`);
    update(questionRef, { answers: newAnswers });
    setAnswers(newAnswers);
    setEditIndex(-1);
    setUserReply("");
  };

  const deleteAnswer = (index) => {
    const newAnswers = [...answers];
    newAnswers.splice(index, 1);
    const questionRef = ref(db, `Questions/${questionId}`);
    update(questionRef, { answers: newAnswers });
    setAnswers(newAnswers);
  };

  

  useEffect(() => {
    const questionRef = ref(db, `Questions/${questionId}`);
    onValue(questionRef, (snapshot) => {
      const data = snapshot.val();
      
      if (data) {
        const { query, tags, userEmail, answers } = data;
        setQuestion({ id: questionId, query, tags, userEmail });
        setAnswers(answers || []);
      }
    });
  }, [questionId]);

  useEffect(() => {
    setUserReply(""); 
  }, [editIndex]);

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <span className="question-page-title-ans">Questions with answers</span>
      <div className="single-ans">
        <p>
          <div className="individual-qs-title-ans">Qs.</div> {question.query}
        </p>
        <p>
          <div className="asked-by">
            <div className="individual-qs-title-ans asked-by ">Asked by:</div>{" "}
            {question.userEmail}
          </div>
        </p>
        <p>
          <div className="individual-qs-title-ans asked-by">Tags.</div>
          <span className="tags-div">
            {question.tags && question.tags.join(", ")}
          </span>
        </p>
  
        <span className="answers-heading">Answers:</span>
        {answers.map((answer, index) => (
          <div key={index}>
            {currentUser.email === answer.userEmail ? (
              editIndex === index ? (
                <>
                  <textarea
                    className="rep-box"
                    type="text"
                    value={userReply}
                    onChange={getUserData}
                  />
                  <div className="edit-buttons">
                    <button className="reply-button" onClick={saveAnswer}>
                      Save
                    </button>
                    <button
                      className="reply-button"
                      onClick={() => setEditIndex(-1)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                
                  <p>
                    {answer.answer}
                  </p>
                
                  <div className="edit-buttons">
                    <button
                      className="reply-button"
                      onClick={() => editAnswer(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="reply-button"
                      onClick={() => deleteAnswer(index)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )
            ) : (
              <p>
                {index + 1}. {answer.answer}
              </p>
            )}
          </div>
        ))}
  
        <div className="edit-box" id="">
          <textarea
            className="ed-box"
            type="text"
            placeholder="Type your answer here..."
            value={userEdit}
            onChange={editUserData}
          />
          <button className="reply-btn" onClick={addReply}>
            Reply
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default Answers;