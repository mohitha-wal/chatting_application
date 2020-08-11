import React, { useEffect,useState } from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';
import getMessages from '../../api/getMessages'
import Message from './Message/Message';

import './Messages.css';

const Messages = ({ messages, name ,room,userName,previousMessages }) => {
  if(previousMessages.length>1)
  console.log(previousMessages[0].message,"hii")
 // console.log(previousMessagesUser,"hlooo")
  console.log(messages)
  const [messagesList,setMessagesList]=useState([])
  // useEffect(()=>{
  //   async function fetchData()
  //   {
  //    // let result = await getMessages(userName,room)
  //    // let otherUserList = await getMessages()
  //     setMessagesList(result)
  //   }
  //   fetchData()
  // },[])
  return(
    
  <ScrollToBottom className="messages">
    {previousMessages.length>1?
    <div>
    {previousMessages.map((message, i) => <div key={i}><Message message={{user:message.userDetails.name,text:message.message}} name={userName}/></div>)}
    </div>:null}
    <div>
    {messages.map((message, i) => <div key={i}><Message message={message} name={userName}/></div>)}
    </div>
  </ScrollToBottom>
 
);
}

export default Messages;