import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router'

const Auths = () => {
    const authStatus = useSelector((state)=> state.auth.isLoggedIn)
    return authStatus;
}

const Auth = ()=> { 
    const location = useLocation() 
    const isAuth = Auths()
    return isAuth? <Outlet /> : <Navigate to="/login" replace state={{from: location}}/>
}
export default Auth;