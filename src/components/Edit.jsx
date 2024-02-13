import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import uploadImg from '../assets/Image-Upload.png'
import SERVER_URL from '../apiServices/serverUrl'
import { toast, ToastContainer } from 'react-toastify'
import { editProjectApi } from '../apiServices/allApi'
import { updateResponseContext } from '../Context/ContextShare'



function Edit({ project }) {
  console.log("project", project);
  const { updateResponse, setUpdateResponse } = useContext(updateResponseContext)
  const [show, setShow] = useState(false)
  const [projectData, setProjectData] = useState({
    id: project._id, title: project.title, languages: project.languages, overview: project.overview, github: project.github, website: project.website, projectImage: ""
  })
  useEffect(() => {
    setProjectData({
      id: project._id, title: project.title, languages: project.languages, overview: project.overview, github: project.github, website: project.website, projectImage: ""
    })
  }, [project])
  const [preview, setPreview] = useState("")
  const handleShow = () => {
    setShow(true)
  }
  const handleClose = () => {
    setShow(false)
    setProjectData({
      id: project._id, title: project.title, languages: project.languages, overview: project.overview, github: project.github, website: project.website, projectImage: ""
    })
    setPreview("")
  }
  useEffect(() => {
    if (projectData.projectImage) {
      setPreview(URL.createObjectURL(projectData.projectImage))
    }
    else {
      setPreview("")
    }

  }, [projectData.projectImage])

  const handleUpdateProject = async () => {
    const { id, title, languages, overview, github, website, projectImage } = projectData
    if (!title || !languages || !overview || !github || !website) {
      toast("Please fill the form completely")
    }
    else {
      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("languages", languages)
      reqBody.append("overview", overview)
      reqBody.append("github", github)
      reqBody.append("website", website)
      preview ? reqBody.append("projectImage", projectImage) : reqBody.append("projectImage", project.projectImage)
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": preview ? "multipart/form-data" : "application/json",
          "Authorization": `Bearer ${token}`
        }
        console.log("Proceed to api call");
        try {
          const result = await editProjectApi(reqBody, reqHeader, id)
          if (result.status === 200) {
            console.log(result.data);
            setUpdateResponse(result.data)
            handleClose()
          }
        }
        catch (err) {
          console.log(err);
        }
      }
    }
  }

  return (
    <>
      <Button variant={'link'} className='m-2 text-secondary' onClick={handleShow}><i className="fa-solid fa-pen fa-2x"></i></Button>
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
                <input onChange={e => { setProjectData({ ...projectData, projectImage: e.target.files[0] }) }} type="file" style={{ display: 'none' }} />
                <img src={preview ? preview : `${SERVER_URL}/uploads/${project?.projectImage}`} alt="" className='img-fluid' />
              </label>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <input type="text " onChange={e => setProjectData({ ...projectData, title: e.target.value })} value={projectData?.title} className='form-control w-100' placeholder='Project title' />
              </div>
              <div className="mb-3">
                <input type="text " onChange={e => setProjectData({ ...projectData, languages: e.target.value })} value={projectData?.languages} className='form-control w-100' placeholder='Language used' />
              </div>
              <div className="mb-3">
                <input type="text " onChange={e => setProjectData({ ...projectData, github: e.target.value })} value={projectData?.github} className='form-control w-100' placeholder='Project github link' />
              </div>
              <div className="mb-3">
                <input type="text " onChange={e => setProjectData({ ...projectData, website: e.target.value })} value={projectData?.website} className='form-control w-100' placeholder='Project website link' />
              </div>
              <div className="mb-3">
                <input type="text" onChange={e => setProjectData({ ...projectData, overview: e.target.value })} value={projectData?.overview} className='form-control w-100' placeholder='Project overview' />
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateProject}>Update</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>

  )
}

export default Edit