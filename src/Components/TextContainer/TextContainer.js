import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import sendRequest from '../../api/sendRequest'
import jwt from 'jsonwebtoken'
import './TextContainer.css';
import { getUsers, getFollowers } from '../../api/getUsers'
import ChatBox from '../ChatBox/ChatBox';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts'
const TextContainer = ({ users }, name) => {

  const [user, setUsers] = useState('')
  const [follower, setFollower] = useState('')
  const [chatStarted, setChatStarted] = useState(false)
  const [followerName, setName] = useState('')
  const token = localStorage.getItem("token")
  const payload = jwt.decode(token)
  var k = [], userArray
  useEffect(() => {

    async function fetchData() {
      let res = await getUsers(payload.name)
      console.log(res)
      setUsers(res)
      let result = await getFollowers(payload.name)
      setFollower(result)
      console.log(user)

    }
    fetchData();
  }, [])

  const requestFollow = async (name) => {
    console.log(payload)
    console.log("hii")
    const reqObj = {
      userName: payload.name,
      followingName: name
    }
    let res = await sendRequest(reqObj)
    if (res.success)
      ToastsStore.success("Request sent successfully")
    else
      ToastsStore.warning("Request already sent")
  }
  const chat = (name) => {
    setChatStarted(true)
    setName(name)

  }
  const chatEnd = () => {
    console.log("closed")
    setChatStarted(false)
  }
  return (
    <div >
      <div className="textContainer">
        {
          user
            ? (
              <div>
                <h2>People in this room are:</h2>
                <div className="activeContainer">
                  <h2>
                    {user.map((name) => {
                      if (name.userDetails.length > 0) {
                        return name.userDetails.map(item => {
                          return <div key={item.followingUserDetails.name} className="activeItem">
                            {console.log(payload.name,item.accept === true&&name.name===payload.name)}
                            {item.followingUserDetails.name === payload.name && (item.accept === true) ?
                               item.accept === true&&name.name!==payload.name&&!k.includes(name.name)
                               ?
                               <div>
                                 
                                 <span>{k.push(name.name)}</span>{name.name} 
                                  <button className="reqButton" onClick={() => requestFollow(name.name)}>Invite</button></div>
                                  :item.accept?<span>{k.push(item.followingUserDetails.name)}</span>:null
                              
                              :
                              <div>
                                <span>{k.push(item.followingUserDetails.name)}</span>
                                {item.followingUserDetails.name}
                                <button onClick={()=> ToastsStore.warning("Request already sent")} className="reqButton">Requested</button>
                              </div>}

                          </div>

                        })
                      }
                      else {
                        {console.log(k)}
                        return <div> {!k.includes(name.name) &&name.name!==payload.name?
                          
                          <div>
                            {console.log(name.name)}
                            {name.name}
                            <button className="reqButton" onClick={() => requestFollow(name.name)}>Invite</button>
                          </div> : null}
                        </div>
                      }
                    })}
                  </h2>
                </div>
              </div>
            )
            : <div>No one are present in this room</div>
        }
        <h2>Followers</h2>

        {
          follower
            ?
            <div className="activeContainer">
              <h2>
                {follower.map((name) => {
                  return <div key={name.name} className="activeItem">
                    <Link onClick={() => chat(name.userDetails ? name.userDetails.name : name.followingUserDetails.name)}>{name.userDetails ? name.userDetails.name : name.followingUserDetails.name}</Link>
                  </div>
                })}
              </h2>
            </div> : <div>No Followers send a follow request to start a chat!</div>

        }
      </div>
      {chatStarted ? <ChatBox name={followerName} chatEnd={chatEnd} /> : <div>Welcome to chat</div>}
      <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
    </div>
  );
}

export default TextContainer;