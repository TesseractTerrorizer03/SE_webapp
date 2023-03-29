import React,{useState} from 'react';
import './home.css';
import Navbar from './navbar.js';
// import Parse from 'parse/dist/parse.min.js';
import {auth} from "../firebase";
import { signOut } from "firebase/auth";
import {useNavigate} from 'react-router-dom';
// import { useAuth0 } from "@auth0/auth0-react";


function Home(){
  // const { user } = useAuth0();
  // let usercred=user.sub;
  const navigate= useNavigate();
  const [usertxt,setUsertxt]=useState({query:''});
  // let name1,value1;
  const getUserData=(event)=>{
    let name=event.target.name;
    let value=event.target.value;
    setUsertxt({ ...usertxt,[name]:value});
  };
  const postData=async(e)=>{
          // alert('executed')
          e.preventDefault();
          const {query}=usertxt;
          // alert(pass)

          const currentUser = auth.currentUser;
          const userEmail = currentUser ? currentUser.email : null;
          const answer = null;

          if (query ) {
              const res1 = await fetch('https://logincreateform-7244d-default-rtdb.firebaseio.com/Questions.json',
          {
              method:"POST",
              headers:{
                  "Content-type":"application/json",
              },
              body: JSON.stringify({
                  query,
                  userEmail,
                  answer,
              }),
          }
          );
          if (res1) {
              setUsertxt({
                  query:"",
              });
              alert("Question Posted!")
          }   
          }
          else {
              alert("Empty submission is not allowed!")
          }
      };
  const GoTODashboard = () =>{
    navigate("/dashboard")
  }
    const handleSignOut = () => {
      signOut(auth).then(() => {
        alert('Succesfully Signed out!')
        navigate("/")
      }).catch((error) => {
        alert('Error in Signing out!')
        alert(error);
      });
    };
    return (
        <div className='home_div'>
    <Navbar/>

  
  <div className="container">
    <div className="left-sidebar">
    <div className='left-sidebar-enclosed'>
      <span className='left-title'>Subjects to choose from </span>
          <ul className='side-list'>
            <li className='list-items'>
              {/* <a href=""className='side-links'> */}
                <img src={require('./science.webp')} className='side-img' alt="Science" />
                <span className='side-name'>Science</span>
              {/* </a> */}
            </li>
            <li>
              {/* <a href="#"className='list-items'> */}
                <img src={require('./math.webp')} className='side-img' alt="Maths" />
                <span className='side-name'>Maths</span>
              {/* </a> */}
            </li>
            <li>
              {/* <a href="#"className='list-items'> */}
                <img src={require('./csimage.png')} className='side-img' alt="CS" />
                <span className='side-name'>Computer Science</span>
              {/* </a> */}
            </li>
          </ul>
    </div>
    </div>
    <div className="main-content">
      <div className="input-container">
        <h2>What would you like to ask today?</h2>
        <div className="input-box" id="inp-box">
          <textarea type= "text" placeholder="Type your question here..." name = "query"
            value  = {usertxt.query}
            onChange={getUserData}/> 
        </div>
        <button id="submit-btn"  onClick={postData}> Post</button>
      </div>
    </div>
    <div className="right-sidebar" />
  </div>
  {/* Container */}
  <div className="container" id="cont">
    <div className="contbox">
      {/* <div>This is the home page </div> */}
      {/* <button class="acc"id="newacc" type="button" onclick="document.getElementById('loginbox').style.display='none';document.getElementById('account').style.display='block';document.getElementById('newacc').style.display='none';document.getElementById('log').style.display='block'">Create New account</button> */}
    </div>
  </div>
</div>

    );
}

export default Home;
