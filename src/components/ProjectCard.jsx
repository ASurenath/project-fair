import React, { useState } from 'react'
import { Card, Col, Modal, Row } from 'react-bootstrap'
import SERVER_URL from '../apiServices/serverUrl';




function ProjectCard({ project }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log();
  return (
    <>
      <Card style={{ width: '18rem' }} className='shadow btn btn-outline-primary' onClick={handleShow}>
        <Card.Img variant="top" className='img-fluid' src={`${SERVER_URL}/uploads/${project?.projectImage}`} />
        <Card.Body>
          <Card.Title><h4>{project?.title}</h4></Card.Title>

        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} centered size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <img src={`${SERVER_URL}/uploads/${project?.projectImage}`}
                className='img-fluid'
                alt="" />
            </Col>
            <Col md={6}>
              <h2>{project?.title}</h2>
              <p className='text-dark'>Project overview:
                <span className='text-secondary-emphasis'>
                  {project?.overview}
                </span>              
                </p>
              <p className='text-dark'>
                Language used :
                <span className='text-secondary'>  {project?.languages}</span>
              </p>
            </Col>

          </Row>
          <a href={project?.github} target="_blank"><i className="fa-brands fa-github fs-1 p-2"></i></a>
          <a href={project?.website} target="_blank"><i className="fa-solid fa-link fs-1 p-2"></i></a>
        </Modal.Body>

      </Modal>
    </>
  )
}

export default ProjectCard