import axios from 'axios'
const declineFollowRequest = async (obj) => {
    console.log(obj)
    let res = await axios.delete('http://localhost:8000/decline-follow-request/',obj.followingName+'/'+obj.userName)
    console.log(res)
    if (res) {
        return res.message
    }
    else
        return false
}
export default declineFollowRequest