import React from 'react'
import { useSelector } from 'react-redux'
import Loadingtoredirect from './LoadingtoRedirect'

const UserRoute = ({ children }) => {
    const { user } = useSelector((state) => ({...state}))

    return user && user.token 
    ? children  //ถ้ามี token
    : <Loadingtoredirect />
}

export default UserRoute