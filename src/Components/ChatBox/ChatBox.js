import React, { useState, useEffect } from "react";

import io from "socket.io-client";
import getRoom from '../../api/getRoom'
import jwt from 'jsonwebtoken'
 import TextContainer from '../TextContainer/TextContainer';
 import Messages from '../Messages/Messages';
 import InfoBar from '../InfoBar/InfoBar';
 import Input from '../Input/Input';
 import getMessages from '../../api/getMessages'
 import '../Chat/Chat.css';

let socket;

const ChatBox = ( props) => {
  const [name, setName] = useState('');
  //const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [payloads, setPayload] = useState('');
  const [previousMessages,setPreviousMessages] = useState([])
  const [previousMessagesUser,setPreviousMessagesUser] = useState([])
  const [room,setRoom] = useState('')
  const ENDPOINT = 'localhost:8000';
  // socket = io(ENDPOINT);
  useEffect(() => {
    async function submit(){
    const token = localStorage.getItem("token")
  const payload = jwt.decode(token)
  setPayload(payload)
    const name = props.location.state.name;
    socket = io(ENDPOINT);
      let reqObj={
        followingName:payload.name,
        userName:props.location.state.name
      }
      console.log(reqObj)
      let result = await getRoom(reqObj)
      console.log(result)
      
      setRoom(result.roomName)
      setName(name)
      console.log(name)
      
   
     // console.log(room)
      socket.emit('join', { name:payload.name, room:result.roomName }, (error) => {
        if(error) {
          alert(error);
        }
  
     });
     let res = await getMessages(name,result.roomName)
     setPreviousMessages(res)
     console.log(previousMessages)
    //  let res2 = await getMessages(payload.name,result.roomName)
    //  setPreviousMessagesUser(res2)

    }
    submit()
  }, [ENDPOINT]);
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ( users ) => {
      setUsers(users);
    });
 }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', {message:message,room:room}, () => setMessage(''));
    }
  }

  return (
    
    <div className="outerContainer">
      
      <div className="container">
          <InfoBar name={name}/>
          <Messages messages={messages} name={name} room={room} userName={payloads.name} previousMessages={previousMessages} />
          <Input message={message}  setMessage={setMessage} sendMessage={sendMessage} />
          
      </div>

    </div>
  
  );
}

export default ChatBox;