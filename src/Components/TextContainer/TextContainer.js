import React ,{useState,useEffect} from 'react';
import { Link } from "react-router-dom"
import onlineIcon from '../../icons/onlineIcon.png';
import sendRequest from '../../api/sendRequest'
import jwt from 'jsonwebtoken'
import './TextContainer.css';
import {getUsers,getFollowers} from '../../api/getUsers'
import getRoom from '../../api/getRoom'

const TextContainer = ({ users },name) => {
 
  const [user,setUsers] = useState('')
  const [follower,setFollower] = useState('')
  const [follow,setFollow] = useState('')
  const [props,setProps] = useState('')
  const token = localStorage.getItem("token")
  const payload = jwt.decode(token)
  useEffect(() => {

    async function fetchData() {
        let res = await getUsers()
        console.log(payload)
        setUsers(res)
        let result = await getFollowers(payload.name)
        setFollower(result)
       
    }
    fetchData();
}, [])
// useEffect(()=>{
//   async function fetchData() {
//     let reqObj={
//       followingName:payload.name,
//       userName:follow
//     }
//     console.log(reqObj)
//     let result = await getRoom(reqObj)
//     console.log(result)
//     setProps(result.roomName)
//   }
//   fetchData()

// },[follow])
  const requestFollow=async (name)=>{
    console.log(payload)
    console.log("hii")
    const reqObj={
      userName:payload.name,
      followingName:name
    }
    let res=await sendRequest(reqObj)
  }
  
  return(
  <div className="textContainer">
    <div>
      
      <Link className="link" to="/followrequests">See the Follow Requests</Link>
    </div>
    {
      user
        ? (
          <div>
            <h1>People in this room are:</h1>
            <div className="activeContainer">
              <h2>
                {user.map((name) => {
                 //return name.roomDetails.map(item=>{
                   return <div key={name.name} className="activeItem">
                    {name.name}
                    <button className="reqButton" onClick={()=>requestFollow(name.name)}>Request</button>
                  </div>
                 // })
                })}
              </h2>
            </div>
          </div>
        )
        : <div>No one are present in this room</div>
    }
    <h1>Followers</h1>
    {
      follower
      ? 
        <div className="activeContainer">
          <h2>
                {follower.map((name) => {
                 //return name.userDetails.map(item=>{
                   return <div key={name.name} className="activeItem">
                    {name.userDetails?name.userDetails.name:name.followingUserDetails.name}
                    {/* {setFollow(name.userDetails?name.userDetails.name:name.followingUserDetails.name)} */}
                    <Link   to={{ pathname:'/msgbox',state:{name:name.userDetails?name.userDetails.name:name.followingUserDetails.name,room:props}}}>start</Link>
                    <button className="reqButton">start a chat</button>
                  </div>
                 // })
                })}
              </h2>
        </div>:<div>No Followers send a follow request to start a chat!</div>
      
    }
  </div>
);
  }

export default TextContainer;