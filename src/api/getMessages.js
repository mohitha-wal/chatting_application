import axios from 'axios'
const getMessages = async (userId,roomId) => {
    console.log(userId,roomId)
   // console.log(`http://localhost:8000/get-messages/${userId}/${roomId}`)
    let res = await axios.get('http://localhost:8000/get-messages/'+userId+'/'+roomId)
    console.log(res.data)
    if (res.data) {
        return res.data.data
    }
    else
        return false
}
export default getMessages