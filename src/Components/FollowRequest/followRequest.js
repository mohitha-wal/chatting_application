
import React, { useState, useEffect } from "react"
import acceptFollowRequest from '../../api/acceptFollowRequest'
import declineFollowRequest from '../../api/declineFollowRequest'
import jwt from 'jsonwebtoken'
import getFollowrequest from '../../api/getFollowRequests';
import {getFollowers} from '../../api/getUsers'
const token = localStorage.getItem("token")
const payload = jwt.decode(token)
const FollowRequest = (props) => {
    const [followRequestList, setFollowRequestList] = useState([]);
    var [accept,setAccept]=useState(false)
    const [follower,setFollower]=useState([])
    console.log(payload)
    useEffect(() => {
        async function fetchData() {
            let res = await getFollowrequest(payload.name)
            console.log(res)
            setFollowRequestList(res)
            let result = await getFollowers(payload.name)
            setFollower(result)
        }
        fetchData();
    }, [])
    useEffect(() => {
        if(accept===true)
        props.rerenderParentCallback();
    },[accept])
    const acceptHandler=async(name)=>{
        setAccept(true)
        let reqObj = {
            followingName : name,
            userName : payload.name
        }
        let res = await acceptFollowRequest(reqObj)
        console.log(res)
        props.rerenderParentCallback()
        console.log(accept)
        alert(res)
    }
    const declineHandler=async(name)=>{
        let reqObj = {
            userName : name,
            followingName : payload.name
        }
        let res = await declineFollowRequest(reqObj)
        alert(res.message)

    }
    return (
        <div>
        <div>FollowRequests
            {console.log(followRequestList)}
            {followRequestList.length>0?
             followRequestList.map((item) => {

                    return <div>
                        {!item.accept?
                        <div>
                            {console.log(item.accept)}
                        <h1>{item.userDetails.name}</h1>
                        {console.log(item.accept)}
                        <button  onClick={()=>acceptHandler(item.userDetails.name)}>{!item.accept?'accept':'accepted'}</button>
                        <button  onClick={()=>declineHandler(item.userDetails.name)}>decline</button>
                        </div>
                        :<h2>There are no active follow requests</h2>}</div>
                
            }):<h2>There are no active follow requests</h2>}
        </div>
        <div>Followers
        {follower
            ?
            <div className="activeContainer">
              <h2>
                {follower.map((name) => {
                  return <div key={name.name} className="activeItem">
                   {name.userDetails ? name.userDetails.name : name.followingUserDetails.name}
                   <button className="reqButton" onClick={()=>declineHandler(name.userDetails ? name.userDetails.name : name.followingUserDetails.name)}>decline</button>
                  </div>
                })}
              </h2>
            </div> : <div>No Followers send a follow request to start a chat!</div>
}
    </div>
    </div>
    )
}
export default FollowRequest;
