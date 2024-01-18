import React from 'react'
import Header from '../components/Header'
import { Col, Container, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'



function Projects() {
  return (
    <>
     <Header/>
    <Container fluid={'sm'} className='text-dark d-flex justify-content-between p-5'>
      <h2 className='m-3 text-primary'>Projects</h2>
      <input type='text' placeholder='Search projects by language used' className='form-control m-3 w-50'/>
      
    </Container>
    <Container fluid={'sm'} className='text-dark p-5 pt-0'>

    <Row>
        <Col lg={4} md={6}>
          <ProjectCard/>
        </Col>

      </Row>
      </Container>
    </>
  )
}

export default Projects