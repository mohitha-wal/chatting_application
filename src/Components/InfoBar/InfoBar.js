import React from 'react';
import Messages from '../Messages/Messages'
import Input from '../Input/Input'
import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';
import {Link} from 'react-router-dom'
import './InfoBar.css';
var message=["hii"]
var name="mohi"
const InfoBar = (props) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>{props.name}</h3>
    </div>
    <div className="rightInnerContainer">
      <Link onClick={props.chatEnd}><img src={closeIcon} alt="close icon" /></Link>
    </div>
   
  </div>
);

export default InfoBar;