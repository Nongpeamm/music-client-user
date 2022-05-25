import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Loadingtoredirect from './LoadingtoRedirect'
import { currentAdmin } from '../functions/auth'

const AdminRoute = ({ children }) => {
    const { user } = useSelector((state) => ({...state}))
    const [ ok, setok ] = useState(false);

    useEffect(() => {

        if(user && user.token){
            currentAdmin(user.token)
            .then(res => {
                console.log(res)
                setok(true);
            })
            .catch(err=>{
                console.log(err)
                setok(false);
            })
        }

    }, [user])

    return ok
    ? children  //ถ้ามี token
    : <Loadingtoredirect />
}

export default AdminRoute