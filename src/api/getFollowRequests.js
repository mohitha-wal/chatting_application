import axios from 'axios'
const getFollowrequest = async (obj) => {
    console.log(obj)
    let res = await axios.get('http://localhost:8000/get-follow-requests/'+obj)
    console.log(res.data)
    if (res.data) {
        return res.data.data
    }
    else
        return false
}
export default getFollowrequest