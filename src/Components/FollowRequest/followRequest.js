
import React, { useState, useEffect } from "react"
import acceptFollowRequest from '../../api/acceptFollowRequest'
import declineFollowRequest from '../../api/declineFollowRequest'
import jwt from 'jsonwebtoken'
import getFollowrequest from '../../api/getFollowRequests';
const token = localStorage.getItem("token")
const payload = jwt.decode(token)
const FollowRequest = () => {
    const [followRequestList, setFollowRequestList] = useState([]);
    const [accept,setAccept]=useState(false)
    console.log(payload)
    useEffect(() => {
        async function fetchData() {
            let res = await getFollowrequest(payload.name)
            console.log(res)
            setFollowRequestList(res)
        }
        fetchData();
    }, [])

    const acceptHandler=async(name)=>{
        let reqObj = {
            followingName : name,
            userName : payload.name
        }
        let res = await acceptFollowRequest(reqObj)
        console.log(res)
        if(res)
        setAccept(true)
        alert(res)
    }
    const declineHandler=async(name)=>{
        let reqObj = {
            userName : payload.name,
            followingName : name
        }
        let res = await declineFollowRequest(reqObj)
        alert(res.message)

    }
    return (
        <div>FollowRequests
            {console.log(followRequestList, Array.isArray(followRequestList))}
            {followRequestList.length>0?
             followRequestList.map((item) => {

                    return <div>
                        <h1>{item.userDetails.name}</h1>
                        {console.log(item.accept)}
                        <button onClick={()=>acceptHandler(item.userDetails.name)}>{!item.accept?'accept':'accepted'}</button>
                        <button disable="true" onClick={()=>declineHandler(item.userDetails.name)}>decline</button>
                        </div>
                
            }):<h1>There are no active follow requests</h1>}
        </div>
    )
}
export default FollowRequest;
