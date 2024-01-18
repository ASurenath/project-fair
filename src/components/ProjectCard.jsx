import React, { useState } from 'react'
import { Card, Col, Modal, Row } from 'react-bootstrap'




function ProjectCard() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
    <Card style={{ width: '18rem' }} className='shadow btn btn-outline-primary' onClick={handleShow}>
      <Card.Img variant="top" className='img-fluid' src="https://www.littlethings.info/wp-content/uploads/2014/04/dummy-image-green-e1398449160839.jpg" />
      <Card.Body>
        <Card.Title><h4>Card Title</h4></Card.Title>
        
      </Card.Body>
    </Card>

    <Modal show={show} onHide={handleClose} centered size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <img src="https://www.littlethings.info/wp-content/uploads/2014/04/dummy-image-green-e1398449160839.jpg"
              className='img-fluid'
              alt="" />
            </Col>
            <Col md={6}>
              <h2>Title</h2>
              <p className='text-dark'>Project overview: 
<span  className='text-secondary-emphasis'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum culpa alias animi quia suscipit doloremque at laudantium vero dolorum praesentium ut tenetur, provident voluptas architecto maiores quidem sapiente laborum magnam.
  
</span>              </p>
              <p className='text-dark'>
                Language used :
                <span className='text-secondary'> React</span>
              </p>
            </Col>

          </Row>
          <a href="http://google.com" target="_blank"><i className="fa-brands fa-github fs-1 p-2"></i></a>
          <a href="http://google.com" target="_blank"><i className="fa-solid fa-link fs-1 p-2"></i></a>

        </Modal.Body>
     
      </Modal>
    </>
  )
}

export default ProjectCard