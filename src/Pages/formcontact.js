import React,{ useState} from "react";
import './Style.css';
import {useNavigate} from 'react-router-dom';
import {  getAuth ,AuthErrorCodes, signInWithEmailAndPassword } from "firebase/auth";
// import { firebaseApp } from "../services/firebase";
import {app,database} from "../firebase";
import {ref,onValue} from "firebase/database"

const Formcontact = () =>{
    const navigate= useNavigate();
    function redirect(){
        navigate("/home")
    }
    const [userlog,setUserlog]=useState({
        email:"",
        password:"",
    });
    let name,value;
    const getUserData=(event)=>{
        name=event.target.name;
        value=event.target.value;
        setUserlog({ ...userlog,[name]:value});
     };
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const auth= getAuth(app);
  
  
  function handleLogin(e) {
    const {email,password}=userlog;
//     const postData=async(e)=>{
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential.user);
        redirect()
        // ...
      })
      .catch((err) => {
        if (
        err.code === AuthErrorCodes.INVALID_PASSWORD ||
        err.code === AuthErrorCodes.USER_DELETED
      ) {
        setError("The email address or password is incorrect");
      } else {
        console.log(err.code);
        alert(err.code);
      }
      });
  };

//   const handleChange = (e) => {
//     setInput((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };


    const [useracc,setUseracc]=useState({
        rollno:"",
        pass:"",
        email:"",
    });
    // let name1,value1;
    const getUserData1=(event)=>{
        let name=event.target.name;
        let value=event.target.value;
        setUseracc({ ...useracc,[name]:value});
    };
    const postData1=async(e)=>{
        alert('executed')
        e.preventDefault();
        const {rollno,pass,email}=useracc;
        alert(pass)
        if (rollno && pass && email ) {
            const res1 = await fetch('https://logincreateform-7244d-default-rtdb.firebaseio.com/Login.json',
        {
            method:"POST",
            headers:{
                "Content-type":"application/json",
            },
            body: JSON.stringify({
                rollno,
                pass,
                email,
            }),
        }
        );
        if (res1) {
            setUseracc({
                rollno:"",
                pass:"",
                email:"",
            });
            alert("Data Submitted Account")
        }   
        }
        else {
            alert("Empty fields are  allowed!")
        }
    };
    return (
        <>
        <meta charSet="utf-8" />
        <title>Portal Login</title>
        <style
            dangerouslySetInnerHTML={{
            __html:
                "\n        div.createaccount {\n          display: none;\n        }\n        button.loginbutton{\n            display: none;\n        }\n    "
            }}
        />
        <link rel="stylesheet" type="text/css" href="Style.css" />
        <div className="form_container" id="cont">
            <div className="loginbox" id="loginbox">
            <form className="l_form" id="lform" method="POST" action="">
                <h1 className="form_title1">Log in to your account</h1>
                <input
                className="input"
                name="email"
                type="text"
                autoComplete="off"
                placeholder="E-Mail"
                value={userlog.email}
                onChange={getUserData}
                // value={rollno}
                // onChange={e => setRollNo(e.target.value)}
                required
                />
                <input
                className="input"
                name="password"
                type="password"
                placeholder="Password"
                value={userlog.password}
                onChange={getUserData}
                // value={password}
                // onChange={e => setPassword(e.target.value)}
                required
                />
                {/* <button type="submit" class="form_submit">Log In</button> */}
                <input
                type="submit"
                defaultValue="Login"
                className="form_submit"
                id="login-form-submit"
                // onClick={postData}
                onClick={handleLogin}
                />
            </form>
            <div className="options">
                <span>OR</span>
            </div>
            {/* <button class="acc"id="newacc" type="button" onclick="document.getElementById('loginbox').style.display='none';document.getElementById('account').style.display='block';document.getElementById('newacc').style.display='none';document.getElementById('log').style.display='block'">Create New account</button> */}
            <div className="account_div">
                Don't have an Account?{" "}
                {/* <button
                className="acc"
                id="newacc"
                type="button"
                onClick={document.getElementById('loginbox').style.display='none';document.getElementById('account').style.display='block';document.getElementById('newacc').style.display='none';document.getElementById('log').style.display='block'}
                >
                Create New account
                </button> */}
                <button
                className="acc"
                id="newacc"
                type="button"
                onClick={() => {
                    document.getElementById('loginbox').style.display = 'none';
                    document.getElementById('account').style.display = 'block';
                    document.getElementById('newacc').style.display = 'none';
                    document.getElementById('log').style.display = 'block';
                }}
                >
                Create New account
                </button>

            </div>
            {error && <div>{error}</div>}
            </div>
            <div className="createaccount" id="account">
            <form className="form" id="aform" method="POST" action="">
                <h1 className="form_title2">Create Account</h1>
                <input
                className="input"
                name="email"
                type="text"
                placeholder="Email ID"
                value1={useracc.email}
                onChange={getUserData1}
                required
                />
                <input
                className="input"
                name="rollno"
                type="text"
                placeholder="Roll Number"
                value1={useracc.rollno}
                onChange={getUserData1}
                required
                />
                <input
                className="input"
                name="pass"
                type="password"
                placeholder="Password"
                value1={useracc.pass}
                onChange={getUserData1}
                required
                />
                {/* <button type="submit" class="form_button">SIGN UP</button> */}
                <input
                type="submit"
                defaultValue="Create"
                className="acc_form" //check if the input is to be changed to button type
                id="account-submit"
                onClick={postData1}
                />
            </form>
            {/* <div class="account_div">Don't have an Account? <button class="acc"id="newacc" type="button" onclick="document.getElementById('loginbox').style.display='none';document.getElementById('account').style.display='block';document.getElementById('newacc').style.display='none';document.getElementById('log').style.display='block'">Create New account</button></div> */}
            <div className="back_login">
                Back to
                {/* <button
                className="loginbutton"
                id="log"
                type="button"
                onclick="document.getElementById('loginbox').style.display='block';document.getElementById('account').style.display='none';document.getElementById('newacc').style.display='block';document.getElementById('log').style.display='none'"
                >
                Login
                </button> */}
                <button
                className="loginbutton"
                id="log"
                type="button"
                onClick={() => {
                    document.getElementById('loginbox').style.display = 'block';
                    document.getElementById('account').style.display = 'none';
                    document.getElementById('newacc').style.display = 'block';
                    document.getElementById('log').style.display = 'none';
                }}
                >
                Login
                </button>

            </div>
            </div>
        </div>
        </>

    );
};
export default Formcontact;