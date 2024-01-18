import React from 'react'
import Header from '../components/Header'
import { Col, Container, Row } from 'react-bootstrap'
import MyProjects from '../components/MyProjects'
import Profile from '../components/Profile'




function Dashboard() {
  return (
    <>
      <Header insideDashboard />
      <Container fluid={'md'} className='pt-2'>
        <h2>Welcome <span className='text-secondary'>User</span></h2>
        <Row>
          <Col lg={8}>
            <MyProjects />
          </Col>
          <Col lg={4}>
            <Profile />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Dashboard