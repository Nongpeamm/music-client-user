import axios from "axios";

//ทำการส่ง value บันทึกข้อมูลลงไปดังนี้ ผ่าน route register 
export const register = async(value) => await axios.post(process.env.REACT_APP_API+'/register', value)
export const login = async(value) => await axios.post(process.env.REACT_APP_API+'/login', value)