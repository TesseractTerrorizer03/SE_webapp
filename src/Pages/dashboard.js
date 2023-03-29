import React from 'react';
import './dashboard.css';
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import {auth,database,ref} from "../firebase";
import { signOut } from "firebase/auth";
import { query, orderByChild, equalTo,onValue } from 'firebase/database';

function Dashboard(){
  // const [usertxt, setUsertxt] = useState({ query: "" });
  const navigate= useNavigate();
  const handleSignOut = () => {
    signOut(auth).then(() => {
      alert('Succesfully Signed out!')
      navigate("/")
    }).catch((error) => {
      alert('Error in Signing out!')
      alert(error);
    });
  };
  // const userEmail = "shashwat@gmail.com";

  const [userData, setUserData] = useState(null);
  // const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // const database = getDatabase();
    const userRef = ref(database, 'Questions');

    onValue(userRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const userDataArray = Object.keys(data).map((key) => {
          return {
            id: key,
            ...data[key],
          };
        });
        setUserData(userDataArray);
      }
    });
  }, []);

    return(
<div id="dashboard-container">
        <div id="dashboard">
          <div id="dashboard-top">
            <div id="dashboard-top-left">Dashboard</div>
            {/* <div id="dashboard-top-right"> */}
            <button
                // className=""
                id="dashboard-top-right"
                type="button"
                onClick={handleSignOut}
                >
                Logout
                </button>
            {/* </div> */}
          </div>
        <div className='dashboard-middle'>
          <div id="dashboard-pass-and-details">
            <div id="dashboard-personalDetails">
              <div id="dashboard-personalDetails-title">Personal Details</div>
              <div id="dashboard-personalDetails-content">
                <div className="dashboard-personalDetails-content-title">
                  Name:{" "}
                  <span className="dashboard-personalDetails-content-value">
                    Shashwat Roy
                  </span>
                </div>
                <div className="dashboard-personalDetails-content-title">
                  Email:{" "}
                  <span className="dashboard-personalDetails-content-value">
                    roy.16@iitj.ac.in
                  </span>
                </div>
                <div>
      {/* <input type="text" value={userEmail} onChange={handleUserEmailChange} />
      <button onClick={handleFetchData}>Fetch Data</button> */}
      {userData &&
        userData.map((user) => (
          <div key={user.id}>
            <h2>{user.query}</h2>
            <p>{user.answer}</p>
          </div>
        ))}
    </div>
              </div>
            </div>

          </div>


          <div className='person_img'>
            {/* <img src={} */}
          </div>
        </div>


          {/* <div id="dashboard-download-ticket-wrapper">
            <div
              id="dashboard-download-ticket">
              <div className="dashboard-pass-left-side">
                /* {console.log(userData)} 
               
                  <div
                    className="dashboard-pass-registrationID"
                    style={{
                      fontSize: "calc(0.025 * 1771px)",
                    }}
                  >
                    <div
                      className="registration-text"
                      style={{
                        fontSize: "calc(0.014 * 1771px)",
                      }}
                    >
                      Registration ID:{" "}
                    </div>
                    1234
                  </div>
                
                <div className="pass-details">
                  <div
                    className="middle-text">
                    Name
                  </div>
                  <div
                    className="middle-text-mail">
                    mail
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div id="dashboard-registeredEvents">
            <div id="dashboard-registeredEvents-title">Asked Questions</div>
            <div id="dashboard-registeredEvents-content">
            <div className='question-asked'>
          
              <span className='question-content'>
                <span className='ques-no'> Qs :-  </span>
                What are the possible digits upto which pie can be found out?
              </span>
              <br></br>
              <span className='question-content'>
                <span className='ques-no'> Qs :-  </span>
                What are the programming languages used for web development?
              </span>
              {/* <button onClick={CheckQuestions}></button> */}

            </div>
            </div>
          </div>
        </div>
        
</div>
    );
}
export default Dashboard;