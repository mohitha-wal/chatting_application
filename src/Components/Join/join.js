import React, { useState } from 'react';
import { Link,Redirect } from "react-router-dom";
import {login,signUp} from '../../api/login'
import './Join.css'
import {useFormik} from 'formik'
import Chat from '../Chat/Chat'

export default function SignIn() {
  const [name, setName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const validate = values => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    } else if (values.name.length > 15) {
      errors.name = 'Must be 15 characters or less';
    }
  
    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 8) {
      errors.password = 'Must be greater than 8 characters ';
    }
    return errors
  }
  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    validate,
    onSubmit:async (values) => {
      let reqObj ={
        name:values.name,
        password:values.password
      }
      
      console.log("signin")
      let result = await login(reqObj)
      localStorage.setItem('token',result.token)
      setIsLoggedIn(true)
    },
  });
  const submit=async()=>{
    console.log(formik.values.name)
    let reqObj ={
      name:formik.values.name,
      password:formik.values.password
    }
    
    console.log("signin")
    let result = await login(reqObj)
    localStorage.setItem('token',result.token)
    setIsLoggedIn(true)
  }
  return (
    !isLoggedIn?
    <form onSubmit={formik.handleSubmit}>
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
       
          <input
           placeholder="Name" 
           className="joinInput" 
           type="text"
           name="name"
           onChange={formik.handleChange}
           value={formik.values.name}
        />
         {formik.errors.name ? <div style={{color:"red",left:675,position:"absolute"}}>{formik.errors.name}</div> : null}
        </div>
        <div>
          <input 
          type="password" 
          placeholder="Password" 
          className="joinInput mt-20"  
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password} />
           {formik.errors.password ? <div style={{color:"red",left:675,position:"absolute"}}>{formik.errors.password}</div> : null}
        </div>
        {/* <Link  to={{ pathname:'/chat',state:{name:name,password:password}}}> */}
          <button   className={'button mt-20'} type="submit">Sign In</button>
        {/* </Link> */}
      </div>
    </div>
    </form>:<Redirect  to={{ pathname:'/chat',state:{name:formik.values.name,password:formik.values.password}}}/>
  );
}