import axios from 'axios'
const login = async (obj) => {
    console.log(obj)
    let res = await axios.post('http://localhost:8000/login',obj)

    if (res.data) {
        return res.data
    }
    else
        return false
}
const signUp = async (obj) => {
    console.log(obj)
    let res = await axios.post('http://localhost:8000/signup',obj)
    
    if (res.data) {
        return res.data.message
    }
    else
        return res.data.message
}
export { login,signUp}