import logo from './logo.svg';
import './App.css';
import React from 'react';
import Formcontact from "./Pages/formcontact.js"
import Home from './Pages/home';
import Dashboard from './Pages/dashboard';

import {Routes, Route, useNavigate} from 'react-router-dom';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
const App = () =>{
  
  return (
    <>
    <div className='App'>
      {/* <Formcontact/> */}
        <Routes>
          <Route path="/" element={<Formcontact />}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
    </div>
    </>
  );
};
export default App;
