import React from 'react'
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <Navbar expand="lg" className="bg-primary text-dark w-100" style={{}}>
            <Container className='w-100'>
                <Row className='w-100'>

                    <Col lg={3} md={6}>
                        <Link to={'/'}>
                            <Navbar.Brand className='fw-bold fs-4'><h5><i className="fa-solid fa-laptop-code"></i>Project Fair</h5></Navbar.Brand>

                        </Link>
                    </Col>

                    <Col lg={3} md={6}>
                        <h5 className='px-5'>
                            Links
                        </h5>
                        <ul>
                            <li><Link to={'/'}>Home</Link></li>
                            <li><Link to={'/login'}>Login</Link></li>
                            <li><Link to={'/register'}>Register</Link></li>
                        </ul>
                    </Col>
                    <Col lg={3} md={6}>
                        <h5 className='px-5'>
                            Guides
                        </h5>
                        <ul>
                            <li><Link to={'/'}>Help</Link></li>
                            <li><Link to={'/'}>FAQ</Link></li>
                            <li><Link to={'/'}>Community</Link></li>
                        </ul>
                    </Col>
                    <Col lg={3} md={6}>
                        <h5 className='px-5'>
                            Contact Us
                        </h5>
                        <form action="">
                            <input type="email" name="" id="" placeholder='Your email id' className='form-control' />
                            <button className='btn btn-outline-light mt-2 ms-5'>Send an E-mail</button>
                        </form>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    )
}

export default Footer