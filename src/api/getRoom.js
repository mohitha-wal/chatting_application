import axios from 'axios'
const getRoom = async (obj) => {
    console.log(obj)
    let res = await axios.get('http://localhost:8000/get-room/'+obj.followingName+'/'+obj.userName)
    console.log(res)
    if (res.data) {
        return res.data.data
    }
    else
        return false
}
export default getRoom;