import React, { useContext, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import login from "../assets/login.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { loginApi, registerApi } from '../apiServices/allApi';
import Spinner from 'react-bootstrap/Spinner';
import { tockenAuthContext } from '../Context/TokenAuth';



function Auth({ insideRegister }) {
  const [loggingIn,setLoggingIn]=useState(false)
  const navigate=useNavigate()
  const [userData,setUserData]=useState({username:"",email:"",password:""})
  const {isLoggedin,setIsLoggedin}=useContext(tockenAuthContext)
  console.log(insideRegister);
  ///Handle Register
  const handleRegister=async(e)=>{
    e.preventDefault()
    console.log(userData);
    if(!userData.username ||!userData.email||!userData.password){
      toast.info("please fill the form completely")
    }
    else{
      // alert("proceed to register API")
      try{
        const result = await registerApi(userData)
        if(result.status===200){
          toast.success(`Welcome ${result.data.username}. Now you can login!`)
          setUserData({username:"",email:"",password:""})
          setTimeout(() => {
            navigate('/login')
          }, 2000);
        }
        else{
          toast.error(`${result.response.data}`)
        }
      }
      catch(err){
        console.log(err)
      }
    }
  }
  ///Handle Login

  const handleLogin=async(e)=>{
    e.preventDefault()
    console.log(userData);
    const {email,password}=userData
    if(!email||!password){
      toast.info("please fill the form completely")
    }
    else{
      // alert("proceed to register API")
      try{
        const result = await loginApi({email,password})
        if(result.status===200){
          sessionStorage.setItem("username",result.data.existingUser.username)
          sessionStorage.setItem("token",result.data.token) 
          sessionStorage.setItem("user",JSON.stringify(result.data.existingUser))
          setIsLoggedin(true)
          setLoggingIn(true)
          setTimeout(() => {
            setUserData({email:"",password:""})
            navigate('/')
            setLoggingIn(false)
          }, 2000);
     
        }
        else{
          toast.error(`${result.response.data}`)
        }
      }
      catch(err){
        console.log(err)
      }
    }
  }
  return (
    <>
      <div style={{ minHeight: '80vh', width: '100%' }} className='d-flex justify-content-center align-items-center p-5'>
        <Container variant={'small '}>
          <Link to='/'><h4 className='text-primary'>Back to Home <i className="fa-solid fa-arrow-left"></i></h4> </Link>
          <div className="card shadow rounded-4 p-5 border-primary">
            <Row className='p-3'>
              <Col lg={6}className='p-3'>
                <img src={login} alt="Log-in image" className='w-100' />
              </Col>
              <Col lg={6}className='p-3'>
                <h2 className='text-center text-primary'>Sign {insideRegister ? "up" : "in"} to your Account</h2>
                <Form>

                  {insideRegister ?
                    <Form.Group className="mb-3" controlId="name">
                      <Form.Label>Your Name:</Form.Label>
                      <Form.Control onChange={e=>{setUserData({...userData,username:e.target.value})}} type="text" placeholder="Enter name" value={userData.username}/>
                    </Form.Group>
                    : ""}
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address:</Form.Label>
                    <Form.Control onChange={e=>{setUserData({...userData,email:e.target.value})}} type="email" placeholder="Enter email" value={userData.email}/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control onChange={e=>{setUserData({...userData,password:e.target.value})}} type="password" placeholder="Enter password" value={userData.password}/>
                  </Form.Group>
                  {insideRegister ?
                    <div className='text-end'>
                      <Button onClick={handleRegister} className='m-2'>Sign up</Button>
                      <p className='p-3'>Already have an account? Click here to <Link to={'/login'}>Sign in</Link></p>
                    </div>
                    :
                    <div className='text-end'>
                      <Button onClick={handleLogin} className='m-2'>Sign in {loggingIn && <Spinner animation="border" size="sm" />}</Button>
                      <p className='p-3'>New user? Click here to <Link to={'/register'}>Register</Link></p>

                    </div>
                  }



                </Form>


              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <ToastContainer autoClose={2000}/>
    </>
  )
}

export default Auth