import { useState, useEffect } from 'react';
import { getDatabase, ref, push, onValue } from "firebase/database";
import {auth} from "../firebase";
import "./QuestionForum.css";
import Navbar from './navbar';
const db = getDatabase();

const QuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const questionsRef = ref(db, 'Questions');
    onValue(questionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const questionsList = Object.entries(data).map(([id, question]) => ({ id, ...question }));
        setQuestions(questionsList);
      }
      setLoading(false);
    });
  }, []);

//   const addNewTask = (query, userEmail, tags) => {
//     push(ref(db, 'Questions'), {
//       query,
//       userEmail,
//       tags,
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const { value: query } = event.target.elements['userQuestion'];
//     const { value: tags } = event.target.elements['tags'];
//     const currentUser = auth.currentUser;
//     const userEmail = currentUser ? currentUser.email : null;
//     addNewTask(query, userEmail, tags);
//     event.target.reset();
//   };

return (
  <div>
  <Navbar/>
  <span className='question-page-title'>Questions</span>
    <div className=''>
      {questions.map((question) => (
        <div key={question.id} className='single-question'>
          <p><div className='individual-qs-title'>Qs.</div> {question.query}</p>
          <p><div className='individual-qs-title'>Asked by:</div> {question.userEmail}</p>
          <p>{question.tags && question.tags.join(", ")}</p>
          {/* {console.log(question.tags)} */}
        </div>
      ))}
    </div>
  </div>
  );
  
};

export default QuestionPage;
