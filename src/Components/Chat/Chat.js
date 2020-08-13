import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import login from '../../api/login'
 import TextContainer from '../TextContainer/TextContainer';
 import FollowRequest from '../FollowRequest/followRequest'
 import Messages from '../Messages/Messages';
 import InfoBar from '../InfoBar/InfoBar';
 import Input from '../Input/Input';
 import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
  MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
  } from "mdbreact";
 import './Chat.css';

let socket;
//const useForceUpdate = () => useState()[1];
const Chat = ( props) => {
   const [name, setName] = useState('');
   const [toggle,setToggle]=useState(false)
    //const forceUpdate =useForceUpdate()
  useEffect(() => {
    const name = props.location.state.name;
    const password = props.location.state.password
     setName(name)
  }, []);
  useEffect(() => {
    console.log("rerendered")
  }, [toggle]);
  const rerenderParentCallback=()=> {
    setToggle(true)
    console.log("hii",toggle)
  }

  return (
    <div>
        {console.log(name)}
    <div className="topnav">
    <h1>Realtime Chat Application <span role="img" aria-label="emoji">💬</span></h1>
 <label> <h2 className="user">Signed in as {name}</h2></label>
    </div>
     <div className="outerContainer">
      
      
      
      {/* <div className="container"> */}
      <TextContainer  name={name}/>
      {/* </div> */}
      <div className="container-left">
          {/* <InfoBar/> */}
          {/* <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} /> */}
          <FollowRequest rerenderParentCallback={rerenderParentCallback}/>
      </div>  
    </div>
    </div>
    
  );
}

export default Chat;