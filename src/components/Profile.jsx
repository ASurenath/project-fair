import React, { useEffect, useState } from 'react'
import { Button, Collapse, Form } from 'react-bootstrap'
import dp from '../assets/dp.png'
import SERVER_URL from '../apiServices/serverUrl'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { editUserApi } from '../apiServices/allApi';


function Profile() {
  const [open, setOpen] = useState(false)
  const [userData, setUserData] = useState({
    username: "", email: "", password: "", profileImage: "", github: "", linkedin: ""
  })
  
  const [existingImage, setExistingImage] = useState('')
  const [preview, setPreview] = useState('')
  useEffect(() => {
    if (sessionStorage.getItem('user')) {
      const user = JSON.parse(sessionStorage.getItem('user'))
      setUserData({ ...userData, username: user.username, email: user.email, password: user.password, profileImage:"", github: user.github, linkedin: user.linkedin })
      setExistingImage(user.profilepic)
    }
  }, [open])
  useEffect(() => {
    if (userData.profileImage) {
      setPreview(URL.createObjectURL(userData.profileImage))
    }
    else {
      setPreview("")
    }
  }, [userData.profileImage])
  console.log("userData",userData);
  const handleProfileUpdate = async () => {
    const { username, email, password, profileImage, github, linkedin } = userData
    if (!github || !linkedin) {
      toast.warning("Please fill the form completely")
    }
    else {
      const reqBody = new FormData()
      reqBody.append("username", username)
      reqBody.append("email", email)
      reqBody.append("password", password)
      reqBody.append("github", github)
      reqBody.append("linkedin", linkedin)
      preview ? reqBody.append("profileImage", profileImage) : reqBody.append("profileImage", existingImage)
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": preview ? "multipart/form-data" : "application/json",
          "Authorization": `Bearer ${token}`
        }
        try {
          const result = await editUserApi(reqBody, reqHeader)
          if (result.status === 200) {
            console.log(result.data);
            setOpen(false)
            sessionStorage.setItem('user', JSON.stringify(result.data))
            // toast.success(`New project ${result.data.title} is added successfully`)
            // setAddResponse(result.data)
          }
        }
        catch (err) {
          console.log(err);
        }

      }
    }
  }
  console.log("existingImage",existingImage)
  console.log("profileImage",userData.profileImage);
  console.log("preview",preview);
  return (
    <>
      <div className='border rounded p-3 my-2'>
        <div className=' fs-3 d-flex justify-content-between'>
          <h3>Profile</h3>
          <Button onClick={() => setOpen(!open)}>
            <i className="fa-solid fa-chevron-down"></i>
          </Button>
        </div>
        <Collapse in={open}>
          <div id="example-collapse-text">
            <form>
              <label className='text-center'>
                <input type='file' onChange={e => setUserData({ ...userData, profileImage: e.target.files[0] })}
                //  style={{ display: 'none' }}
                  />
                {preview == "" ? existingImage == "" ?
                 <img className='img-fluid' src={dp} alt="" style={{ cursor: 'pointer', margin: 'auto', width: '80%' }} />
                  : <img className='img-fluid' src={`${SERVER_URL}/uploads/${existingImage}`} alt="" style={{ cursor: 'pointer', margin: 'auto', width: '80%' }} />
                  : <img className='img-fluid' src={preview} alt="" style={{ cursor: 'pointer', margin: 'auto', width: '80%' }} />
                }
              </label>

              <div className='mt-3'>
                <input type="text" value={userData.github} onChange={e => setUserData({ ...userData, github: e.target.value })} placeholder='Enter your Github link here' className='form-control' />
              </div>

              <div className='mt-3'>
                <input type="text" value={userData.linkedin} onChange={e => setUserData({ ...userData, linkedin: e.target.value })} placeholder='Enter your LinkedIn link here' className='form-control' />
              </div>
              <div className='mt-3'>
                <Button onClick={handleProfileUpdate} className='w-100'>
                  Update
                </Button>
              </div>
            </form>
          </div>
        </Collapse>
      </div>
      <ToastContainer autoClose={2000} />

    </>
  )
}

export default Profile