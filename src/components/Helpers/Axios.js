import  axios  from "axios";
import Cookies from "cookie-universal";
export const baseUrl = 'https://goba.netlabacademy.com'
const cookie = Cookies()
const token = cookie.get('token')
console.log(token);
export const Axios = axios.create({
  baseURL:'https://goba.sunmedagency.com/api',
  headers: {
    Authorization: 'Bearer ' + token
  }
})
