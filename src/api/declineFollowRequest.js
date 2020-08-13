import axios from 'axios'
const declineFollowRequest = async (obj) => {
    console.log(obj)
    let res = await axios.post('http://localhost:8000/decline-follow-request',obj)
    console.log(res)
    if (res) {
        return res.data.message
    }
    else
        return false
}
export default declineFollowRequest