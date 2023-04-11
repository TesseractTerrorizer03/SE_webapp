import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, onValue, update } from "firebase/database";
import { getDatabase } from "firebase/database";

const db = getDatabase();

const Answers = () => {
  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [userReply, setUserReply] = useState("");

  const getUserData = (event) => {
    const { value } = event.target;
    setUserReply(value);
  };

  const addReply = () => {
    const newAnswers = [...answers, userReply];
    const questionRef = ref(db, `Questions/${questionId}`);
    update(questionRef, { answers: newAnswers });
    setAnswers(newAnswers);
    setUserReply("");
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

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{question.query}</h1>
      <p>Asked by: {question.userEmail}</p>
      <p>Tags: {question.tags && question.tags.join(", ")}</p>

      <h2>Answers:</h2>
      {answers.map((answer, index) => (
        <div key={index}>
          <p>{answer}</p>
        </div>
      ))}

      <div className="reply-box" id="rep-box">
        <textarea
          type="text"
          placeholder="Type your answer here..."
          value={userReply}
          onChange={getUserData}
        />
        <button onClick={addReply}>Reply</button>
      </div>
    </div>
  );
};

export default Answers;
