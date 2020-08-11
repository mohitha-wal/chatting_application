import axios from 'axios'
const getUsers = async (obj) => {
    console.log(obj)
    let res = await axios.get('http://localhost:8000/get-users')
    console.log(res.data)
    if (res.data) {
        return res.data.data
    }
    else
        return false
}
const getFollowers = async (obj) => {
    console.log(obj)
    let res = await axios.get('http://localhost:8000/get-followers/'+obj)
    console.log(res.data)
    if (res.data) {
        return res.data.data
    }
    else
        return false
}
export  {getUsers,getFollowers}