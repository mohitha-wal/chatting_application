import React, { useState } from 'react';
import { Link,Redirect } from "react-router-dom";
import {login,signUp} from '../../api/login'
import './Join.css'
import Chat from '../Chat/Chat'

export default function SignIn() {
  const [name, setName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const submit=async()=>{
    let reqObj ={
      name:name,
      password:password
    }
    console.log("signin")
    let result = await login(reqObj)
    localStorage.setItem('token',result.token)
    setIsLoggedIn(true)
  }
  const signUpHandler=async()=>{
    let reqObj ={
      name:name,
      password:password
    }
    let res = await signUp(reqObj)
    alert(res)
  }
  return (
    !isLoggedIn?
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        {/* <div>
          <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div> */}
        <div>
          <input type="password" placeholder="Password" className="joinInput mt-20"  onChange={(event) => setPassword(event.target.value)} />
        </div>
        <button onClick={signUpHandler}  className={'button mt-20'} type="submit">Sign Up</button>
        {/* <Link  to={{ pathname:'/chat',state:{name:name,password:password}}}> */}
          <button onClick={submit}  className={'button mt-20'} type="submit">Sign In</button>
        {/* </Link> */}
      </div>
    </div>:<Redirect  to={{ pathname:'/chat',state:{name:name,password:password}}}/>
  );
}