import axios from 'axios'
const acceptFollowRequest = async (obj) => {
    console.log(obj)
    let res = await axios.post('http://localhost:8000/accept-follow-request',obj)
    console.log(res)
    if (res) {
        return res.data.message
    }
    else
        return false
}
export default acceptFollowRequest