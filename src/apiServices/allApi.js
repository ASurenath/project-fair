import { commonApi } from "./commonApi"
import SERVER_URL from "./serverUrl"

//register
export const registerApi=async(userData)=>{
    return await commonApi("POST",`${SERVER_URL}/register`,userData,"")
}
//login
export const loginApi=async(userData)=>{
    return await commonApi("POST",`${SERVER_URL}/login`,userData,"")
}
//add-project
export const addProjectApi=async(reqBody,reqHeader)=>{
    return await commonApi("POST",`${SERVER_URL}/add-project`,reqBody,reqHeader)
}

//get- home-projects
export const getHomeProjectsApi=async()=>{
    return await commonApi("GET",`${SERVER_URL}/home-projects`,'','')
}


//get- all-projects
export const getAllProjectsApi=async(reqHeader,searchKey)=>{
    return await commonApi("GET",`${SERVER_URL}/all-projects?search=${searchKey}`,'',reqHeader)
}

//get- user-projects
export const getUserProjectsApi=async(reqHeader)=>{
    return await commonApi("GET",`${SERVER_URL}/user-projects`,'',reqHeader)
}

//edit- user-
export const editUserApi=async(reqBody,reqHeader)=>{
    return await commonApi("PUT",`${SERVER_URL}/user/edit`,reqBody,reqHeader)
}

//edit- project-
export const editProjectApi=async(reqBody,reqHeader,pid)=>{
    return await commonApi("PUT",`${SERVER_URL}/project/edit/${pid}`,reqBody,reqHeader)
}

// delete Project
export const deleteProjectApi=async(reqHeader,pid)=>{
    return await commonApi("DELETE",`${SERVER_URL}/project/delete/${pid}`,{},reqHeader)
}