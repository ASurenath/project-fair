import React, { useEffect, useState } from 'react'
import vscode2 from '../assets/vscode2.png'
import { Button, Col, Container, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { getHomeProjectsApi } from '../apiServices/allApi'


function Home() {
    const [loginStatus, setLogginStatus] = useState(false)
    const [homeProjects, setHomeProjects] = useState([])
    const navigate = useNavigate()
    const getHomeProjects = async () => {
        try {
            const result = await getHomeProjectsApi()
            if (result.status == 200) {
                setHomeProjects(result.data)
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getHomeProjects()
        if (sessionStorage.getItem("token")) {
            setLogginStatus(true)
        }
        else {
            setLogginStatus(false)
        }
    }, [])

    console.log(homeProjects);
    const handleNavigate = () => {
        if (loginStatus) {
            navigate('/projects')
        }
        else {
            toast.warning("Please login to get full access to our projects")
        }
    }

    return (
        <>
            <div className='bg-primary w-100 d-flex ' style={{ minHeight: '100vh' }}>
                <Container fluid={'lg'} className='p-5 py-0 text-dark ' style={{ minHeight: '100vh' }}>
                    <Row className='mt-0 p-0 my-5' style={{ height: '100%' }}>
                        <Col lg={4} className='d-flex flex-column justify-content-center align-items-center'>
                            <h1 className='mt-2 mb-0 pb-0 pt-3'>
                                <i className="fa-solid fa-laptop-code"></i>Project Fair
                            </h1>
                            <p className='text-center'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quos eligendi sit et doloribus similique, ut quo, ipsa aliquid eos modi exercitationem mollitia.
                            </p>
                            {loginStatus ?
                                <Link to={'/dashboard'}><Button variant='secondary'>Manage your projects</Button></Link>
                                : <Link to={'/login'}><Button variant='secondary'>Start Now</Button></Link>
                            }
                        </Col>
                        <Col lg={8} className='d-flex flex-column justify-content-center align-items-center'>
                            <img src={vscode2} alt="" className='w-100' />
                        </Col>
                    </Row>

                </Container>
            </div>
            <div className='bg-light w-100 p-0 ' style={{ minHeight: '100vh' }}>
                <Container className='p-5 text-dark d-flex flex-column justify-content-between align-items-center' style={{ minHeight: '100vh' }}>
                    <h1 className='text-primary'>Explore Our Projets</h1>
                    <marquee behavior="" direction="">
                        <div className="d-flex justify-content-between w-100">
                            {homeProjects?.length>0&&homeProjects.map((i, index) =>
                                <div key={index} className='projectcard me-3'><ProjectCard project={i} /></div>)}
                        </div>
                    </marquee>
                    <div>
                        <Button onClick={handleNavigate} variant={'link'} className='text-primary fw-bold'>View more</Button>
                    </div>
                </Container>
            </div>
            <ToastContainer />
        </>
    )
}

export default Home