import axios from "axios";

export const searchTrack = async(value) => await axios.get(process.env.REACT_APP_API+'/search/' + value)