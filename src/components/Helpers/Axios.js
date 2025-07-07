import  axios  from "axios";
import Cookies from "cookie-universal";
export const baseUrl = 'https://goba.sunmedagency.com'
const cookie = Cookies()
const token = cookie.get('token')
console.log(token);
export const Axios = axios.create({
  baseURL:'https://goba.sunmedagency.com/api',
  mode : 'no-cors',
  headers: {
    Authorization: 'Bearer ' + token
  }
})

