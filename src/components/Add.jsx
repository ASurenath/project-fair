import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import uploadImg from '../assets/Image-Upload.png'
import { toast, ToastContainer } from 'react-toastify'
import { addProjectApi } from '../apiServices/allApi'
import { addResponseContext } from '../Context/ContextShare'

function Add() {
  const { addResponse, setAddResponse } = useContext(addResponseContext)
  const [show, setShow] = useState(false)
  const [imageStatus, setImageStatus] = useState(false)
  const [preview, setPreview] = useState(uploadImg)
  const [projectData, setProjectData] = useState({
    title: "", languages: "", overview: "", github: "", website: "", projectImage: ""
  })
  console.log(projectData);
  const handleUploadImage = (e) => {
    let image = e.target.files[0]
    if (image?.type == "image/png" ||
      image?.type == "image/jpg" ||
      image?.type == "image/jpeg") {
      setProjectData({ ...projectData, projectImage: image })
      setImageStatus(true)
      setPreview(URL.createObjectURL(image))
    }
    else {
      setImageStatus(false)
      setPreview(uploadImg)
    }
  }

  // console.log(projectData);
  const handleSave = async () => {
    const { title, languages, overview, github, website, projectImage } = projectData
    if (!title || !languages || !overview || !projectImage || !website || !github) {
      toast.error("Please fill the form completely")
    }
    else {
      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("languages", languages)
      reqBody.append("overview", overview)
      reqBody.append("github", github)
      reqBody.append("website", website)
      reqBody.append("projectImage", projectImage)
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        // toast.success("Proceed to api call")
        try {
          const result = await addProjectApi(reqBody, reqHeader)
          if (result.status === 200) {
            console.log(result.data);
            // toast.success(`New project ${result.data.title} is added successfully`)
            setAddResponse(result.data)
            handleClose()
          }
        }
        catch (err) {
          console.log(err);
        }
      }
    }
  }
  const handleShow = () => {
    setShow(true)
  }
  const handleClose = () => {
    setShow(false)
    setProjectData({
      title: "", languages: "", overview: "", github: "", website: "", projectImage: ""
    })
    setPreview(uploadImg)
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
            <Col md={6} className='text-center'>
              <label>
                <input type="file" style={{ display: 'none' }} onChange={e => handleUploadImage(e)} />
                <img src={preview} alt="" className='img-fluid my-3 border' style={{ cursor: 'pointer' }} />
              </label>
              {!imageStatus && <div className="text-danger text-center" style={{ fontSize: '0.9ew' }}>
                Accepted file types: jeg, jpeg, png
              </div>}
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <input type="text " onChange={e => setProjectData({ ...projectData, title: e.target.value })} value={projectData.title} className='form-control w-100' placeholder='Project title' />
              </div>
              <div className="mb-3">
                <input type="text " onChange={e => setProjectData({ ...projectData, languages: e.target.value })} value={projectData.languages} className='form-control w-100' placeholder='Language used' />
              </div>
              <div className="mb-3">
                <input type="text " onChange={e => setProjectData({ ...projectData, github: e.target.value })} value={projectData.github} className='form-control w-100' placeholder='Project github link' />
              </div>
              <div className="mb-3">
                <input type="text " onChange={e => setProjectData({ ...projectData, website: e.target.value })} value={projectData.website} className='form-control w-100' placeholder='Project website link' />
              </div>
              <div className="mb-3">
                <input type="text " onChange={e => setProjectData({ ...projectData, overview: e.target.value })} value={projectData.preview} className='form-control w-100' placeholder='Project overview' />
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  )
}

export default Add