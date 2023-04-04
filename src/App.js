import './App.css';
import React from 'react';
import Formcontact from "./Pages/formcontact.js"
import Home from './Pages/home';
import QuestionForum from './Pages/QuestionForum';
import Dashboard from './Pages/dashboard';
import { AuthContextProvider } from './Pages/AuthContext.js';
import ProtectedRoute from './Pages/ProtectedRoute';
import {Routes, Route} from 'react-router-dom';


const App = () =>{
  
  return (
    <>
    <div className='App'>
      {/* <Formcontact/> */}
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Formcontact />}/>
          <Route path="/home" element={
           <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }/>
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          }/>
          <Route path="/QuestionForum" element={
            <ProtectedRoute>
              <QuestionForum/>
            </ProtectedRoute>
          }/>
          {/* <Route path="/dashboard" element={<Dashboard/>}/> */}
        </Routes>
      </AuthContextProvider>
    </div>
    </>
  );
};
export default App;