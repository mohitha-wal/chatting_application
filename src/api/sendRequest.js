import axios from 'axios'
const sendRequest = async (obj) => {
    console.log(obj)
    let res = await axios.post('http://localhost:8000/follow-requests',obj)
    console.log(res.data)
    if (res.data) {
        return res.data
    }
    else
        return false
}
export default sendRequest