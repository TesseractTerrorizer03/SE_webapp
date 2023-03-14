import React from 'react';
import './dashboard.css';

function dashboard(){
    return(
       
<div id="dashboard-container">
        <div id="dashboard">
          <div id="dashboard-top">
            <div id="dashboard-top-left">Dashboard</div>
            <div id="dashboard-top-right">
              Logout
            </div>
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
                {/* {userData.contact && (
                  <div className="dashboard-personalDetails-content-title">
                    Phone:{" "}
                    <span className="dashboard-personalDetails-content-value">
                      {userData.contact}
                    </span>
                  </div>
                )} */}
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
            This will contain the questions asked 
            </div>
          </div>
        </div>
      
</div>
    );
}
export default dashboard;