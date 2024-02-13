import React, { createContext, useEffect, useState } from 'react'

export const tockenAuthContext = createContext()
function TokenAuth({ children }) {
    const [isLoggedin, setIsLoggedin] = useState(false)
    useEffect(()=>{
        if(sessionStorage.getItem('token')){
            setIsLoggedin(true)
        }
        else{
            setIsLoggedin(false)
        }
    },[isLoggedin])
    return (
        <tockenAuthContext.Provider value={{ isLoggedin, setIsLoggedin }}>
            <>{children}</>
        </tockenAuthContext.Provider>
    )
}

export default TokenAuth