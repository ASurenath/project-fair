import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Container, Row } from 'react-bootstrap'
import MyProjects from '../components/MyProjects'
import Profile from '../components/Profile'
import { getUserProjectsApi } from '../apiServices/allApi'




function Dashboard() {
  const [username, setUsername] = useState("")
  useEffect(() => {
    setUsername(sessionStorage.getItem("username"))
  }, [])
  
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
  useEffect(() => { getUserProjects() }, [])
  console.log(userProjects);
  
  return (
    <div>
      <Header insideDashboard />
      <Container fluid={'md'} className='py-4 align-items-start'>
        <h2>Welcome <span className='text-secondary'>{username.split(" ")[0]}</span></h2>
        <Row className='my-4'>
          <Col lg={8}>
            <MyProjects />
          </Col>
          <Col lg={4}>
            <Profile />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Dashboard