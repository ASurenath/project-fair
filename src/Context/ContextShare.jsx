import React, { createContext, useState } from 'react'
export const addResponseContext = createContext()
export const updateResponseContext=createContext()

function ContextShare({ children }) {
    const [addResponse, setAddResponse] = useState('')
    const [updateResponse,setUpdateResponse]=useState('')
    return (
        <addResponseContext.Provider value={{addResponse,setAddResponse}}>
            <updateResponseContext.Provider value={{updateResponse,setUpdateResponse}}>
            <>{children}</>
            </updateResponseContext.Provider>
        </addResponseContext.Provider>
    )
}

export default ContextShare