import React, { useContext, useEffect, useState } from 'react'
import Add from './Add'
import { Button } from 'react-bootstrap'
import Edit from './Edit'
import { deleteProjectApi, getUserProjectsApi } from '../apiServices/allApi'
import { addResponseContext, updateResponseContext } from '../Context/ContextShare'


function MyProjects() {
  const {addResponse,setAddResponse}=useContext(addResponseContext)
  const {updateResponse,setUpdateResponse}=useContext(updateResponseContext)

  const [userProjects, setUserProjects] = useState([])
  const getUserProjects = async () => {
    try {
      const token = sessionStorage.getItem('token')
      const reqHeader = {
        "Content-Type": "Application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await getUserProjectsApi(reqHeader)
      if (result.status == 200) {
        setUserProjects(result.data)
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  const handleDelete=async(pid)=>{
    console.log("Pid",pid);
    try {
      const token = sessionStorage.getItem('token')
      const reqHeader = {
        "Content-Type": "Application/json",
        "Authorization": `Bearer ${token}`
      }
      console.log("inside delete. Token:",token);
      const result = await deleteProjectApi(reqHeader,pid)
      if (result.status == 200) {
        console.log(result.data)
        getUserProjects()
      }
      else{
        console.log(result);
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  useEffect(() => { getUserProjects() }, [addResponse,updateResponse])
  console.log("userProjects");
  return (
    <>
      <div className='p-2 border rounded'>
        <div className="d-flex justify-content-between w-100">
          <h2>My Projects</h2>
          <Add />
        </div>
        {userProjects?.length>0?userProjects.map((i,index)=>
        <div key={index} className="d-flex justify-content-between align-items-center rounded border p-2 mb-2">
          <h5>{i.title}</h5>
          <div className="icons d-flex justify-content-between align-items-center ">
            <Edit project={i}/>
            <a href={i.github} target='_blank'>
              <i className="text-secondary fa-brands fa-github fa-2x"></i>
            </a>
            <Button onClick={()=>handleDelete(i._id)} variant='link' className='text-secondary'><i className="fa-solid fa-trash-can fa-2x"></i></Button>
          </div>
        </div>)
        :<div>No projects to display</div>}
      </div>
    </>
  )
}

export default MyProjects