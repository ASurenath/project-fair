import React from 'react'
import vscode2 from '../assets/vscode2.png'
import { Button, Col, Container, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { Link, useNavigate } from 'react-router-dom'


function Home() {
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate('/projects')
    }
    return (
        <>
            <div className='bg-primary w-100' style={{ minHeight: '100vh' }}>
                <Container className='p-5 text-dark '>
                    <Row className='py-5 my-5'>
                        <Col lg={6} style={{ height: '100%' }}>
                            <h1>Project Fair</h1>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quos eligendi sit et doloribus similique, ut quo, ipsa aliquid eos modi exercitationem mollitia, necessitatibus id quisquam neque consequuntur architecto laboriosam.
                            </p>
                            <Link to={'/login'}><Button variant='secondary'>Start Now</Button></Link>
                        </Col>
                        <Col lg={6} >
                            <img src={vscode2} alt="" />
                        </Col>
                    </Row>

                </Container>
            </div>
            <div className='bg-light w-100' style={{ height: '100vh' }}>
                <Container className='p-5 text-dark' style={{height:'100%'}}>
                    <div className='d-flex flex-column justify-content-between align-items-center' style={{height:'100%'}}>
                        <h1 className='text-primary'>Explore Our Projets</h1>
                        <marquee behavior="" direction="">
                            <div className="d-flex justify-content-between">
                                <ProjectCard />
                            </div>
                        </marquee>
                        <div>
                            <Button onClick={handleNavigate} variant={'link'} className='text-primary fw-bold'>View more</Button>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Home