import React from 'react';
import './home.css';

function Home(){
    return (
        <div className='home_div'>
  <nav>
    <div className="nav-left">
      <img src={require('./Doubt_Busters_Logo_nobg.png')} className="logo" alt="logo" />
      <div className="site-name">Doubt Busters</div>
      <div className="icons_navbar">
        <img
          src={require('./question_icon.png')}
          alt="question icon"
          className="question-icon icons"
        />
        <img
          src={require('./bell.png')}
          alt="question icon"
          className="question-icon icons"
        />
      </div>
    </div>
    <div className="nav-right">
      <div className="search-box">
        <img src={require('./search_icon.png')} alt="search icon" className="search-icon" />
        <input type="text" placeholder="Search" />
      </div>
      <div className="user_name online">User_Name</div>
      <div className="logout_button">Logout</div>
      <div className="user-details"></div>
    </div>
  </nav>
  <div className="container">
    <div className="left-sidebar"></div>
    <div className="main-content">
      <div className="input-container">
        <h2>What would you like to ask today?</h2>
        <div className="input-box" id="inp-box">
          <textarea
            id="text-inside"
            placeholder="Type your question here..."
            defaultValue={""}
          />
        </div>
        <button id="submit-btn"> Post</button>
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
