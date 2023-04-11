import React from 'react';
import './dashboard.css';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { auth, database } from "../firebase";
import { signOut } from "firebase/auth";
import { query, ref,orderByChild, equalTo, onValue,getDatabase, get } from 'firebase/database';
import { UserAuth } from './AuthContext';

import Navbar from './navbar.js';

const  Dashboard = () => {
  const navigate = useNavigate();
  const {user} = UserAuth()
  const [userData, setUserData] = useState(null);
  // const db = getDatabase();      
  useEffect(() => {
    if (user.uid) {
      // console.log(user);
      console.log("currentU");

      const userId = user.uid;
      console.log(user.uid)
      
    }
  }, [user]);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      alert('Successfully signed out!');
      navigate('/');
    }).catch((error) => {
      alert('Error in signing out!');
      alert(error);
    });
  };
  const handlegetdata = async(e) => {
    const userId = user.uid;
      console.log(user.uid)
      // const queryRef = query(ref(database, 'Questions'), orderByChild('userId'), equalTo(userId));
      const queryRef = ref(database,`Questions`);
      console.log(queryRef)
      var arr = []
      await get(ref(database,`Questions`)).then((snapshot) =>{
        snapshot.forEach(ele => {
          if (arr.length<5) {
            if(ele.val().userEmail === user.email){
              arr.push(ele.val().query)
            }
          }
        })
      })
      setUserData(arr)
    }
    
    useEffect(() => {
      handlegetdata()
    },[user]);
  
  return (
    <div>
      <Navbar />
      <div id="dashboard-container">
        <div id="dashboard">
          <div id="dashboard-top">
            <div id="dashboard-top-left">Dashboard</div>
          </div>

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
     
              </div>
              </div>
            </div>

          </div>

          <div id="dashboard-main">
          <div id="dashboard-registeredEvents">
            <div id="dashboard-registeredEvents-title">Asked Questions</div>
            <div id="dashboard-registeredEvents-content">
                {userData && userData.map((question,index) => (
              
           <div className='question-asked'>
           
           <span className='question-content'>
             <span className='question-text'>
             <span className='ques-no' key={index}> Qs{index+1}</span> :-{question}<span/>
             
 
           </span>
           </span>
            </div>
                ))}
              </div>
            <button className='see-all-btn'>See all</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
