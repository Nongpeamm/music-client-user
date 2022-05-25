import axios from "axios";

export const addTrack = async(value,authtoken) => await axios.post(process.env.REACT_APP_API+'/add/track', value, {
    headers: {
        authtoken,
    } 
})

export const listTrack = async() => await axios.get(process.env.REACT_APP_API+'/list/track')

export const editTrack = async(id,value, authtoken)=> await axios.put(process.env.REACT_APP_API+'/edit/track/'+id , value , {
    headers: {
        authtoken,
    } 
})

export const deleteTrack = async(authtoken, id) => await axios.delete(process.env.REACT_APP_API+'/delete/track/'+id , {
    headers: {
        authtoken,
    } 
})

export const Favtrackupdate = async(authtoken, id) => await axios.put(process.env.REACT_APP_API+'/fav/track/'+id , {}, {
    headers: {
        authtoken,
    } 
})

export const getTrack = async(id) => await axios.get(process.env.REACT_APP_API+'/getTrack/' + id)







