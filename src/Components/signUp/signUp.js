import React, { useState } from 'react';

import {signUp} from '../../api/login'
import '../Join/Join.css'
import {useFormik} from 'formik'
import { Link } from 'react-router-dom';


export default function SignIn() {

  const validate = values => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Username is Required*';
    } else if (values.name.length > 15) {
      errors.name = 'Must be 15 characters or less';
    }
  
    if (!values.password) {
      errors.password = 'Password is Required*';
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
    onSubmit:async( values) => {
      // alert(JSON.stringify(values, null, 2));
      let reqObj ={
        name:values.name,
        password:values.password
      }
      let res = await signUp(reqObj)
      alert(res)
    }
    
  });
 
  return (

    <form onSubmit={formik.handleSubmit}>
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div className="paddingContainer">
         
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
        <div className= "paddingContainer">
       
          <input 
          type="password" 
          placeholder="Password" 
          className="joinInput mt-20"  
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password} />
           {formik.errors.password ? <div style={{color:"red",left:675,position:"absolute"}}>{formik.errors.password}</div> : null}
        </div>
        <button   className={'button mt-20'} type="submit">Sign Up</button>
        <Link to="/login" className="link">ExistingUser? Login</Link>
      </div>
    </div>
  
    </form>
  )
}
