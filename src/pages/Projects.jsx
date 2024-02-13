import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Container, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { getAllProjectsApi } from '../apiServices/allApi'



function Projects() {
  const [allProjects, setAllProjects] = useState([])
  const [searchKey,setSearchKey]=useState('')

  const getAllProjects = async () => {
    try {
      const token = sessionStorage.getItem('token')
      const reqHeader = {
        "Content-Type": "Application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await getAllProjectsApi(reqHeader,searchKey)
      if (result.status == 200) {
        setAllProjects(result.data)
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  useEffect(() => { getAllProjects() }, [searchKey])
  console.log(allProjects);

  return (
    <>
      <Header />
      <Container fluid={'sm'} className='text-dark d-flex justify-content-between p-5'>
        <h2 className='m-3 text-primary'>Projects</h2>
        <input value={searchKey} onChange={(e)=>setSearchKey(e.target.value)} type='text' placeholder='Search projects by language used' className='form-control m-3 w-50' />

      </Container>
      <Container fluid={'sm'} className='text-dark p-5 pt-0'>

        <Row>
          {allProjects?.length > 0 ? allProjects.map((i, index) =>
            <Col lg={4} md={6} key={index}>
              <ProjectCard project={i} />
            </Col>
          )
            : <div>No projects to display</div>}
        </Row>

      </Container>
    </>
  )
}

export default Projects