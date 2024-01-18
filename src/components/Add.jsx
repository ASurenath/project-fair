import React, { useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import uploadImg from '../assets/Image-Upload.png'




function Add() {
  const [show, setShow] = useState(false)
  const handleShow = () => {
    setShow(true)
  }
  const handleClose = () => {
    setShow(false)
  }
  return (
    <>
      <Button className='m-2' onClick={handleShow}><i className="fa-solid fa-add fa-2x"></i></Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size={'lg'}
      >
        <Modal.Header closeButton>
          <Modal.Title>Project title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <label>
                <input type="file" style={{ display: 'none' }} />
                <img src={uploadImg} alt="" className='img-fluid'/>
              </label>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <input type="text " className='form-control w-100' placeholder='Project title' />
              </div>
              <div className="mb-3">
                <input type="text " className='form-control w-100' placeholder='Language used' />
              </div>
              <div className="mb-3">
                <input type="text " className='form-control w-100' placeholder='Project github link' />
              </div>
              <div className="mb-3">
                <input type="text " className='form-control w-100' placeholder='Project website link' />
              </div>
              <div className="mb-3">
                <input type="text " className='form-control w-100' placeholder='Project overview' />
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary">Save</Button>
        </Modal.Footer>
      </Modal>
    </>

  )
}

export default Add