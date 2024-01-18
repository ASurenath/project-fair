import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import login from "../assets/login.png";

function Auth({ insideRegister }) {
  console.log(insideRegister);
  return (
    <>
      <div style={{ minHeight: '80vh', width: '100%' }} className='d-flex justify-content-center align-items-center p-5'>
        <Container variant={'small '}>
          <Link to='/'><h4 className='text-primary'>Back to Home <i className="fa-solid fa-arrow-left"></i></h4> </Link>
          <div className="card shadow rounded-4 p-5 border-primary">
            <Row className='p-3'>
              <Col lg={6}className='p-3'>
                <img src={login} alt="Log-in image" className='w-100' />
              </Col>
              <Col lg={6}className='p-3'>
                <h2 className='text-center text-primary'>Sign {insideRegister ? "up" : "in"} to your Account</h2>
                <Form>

                  {insideRegister ?
                    <Form.Group className="mb-3" controlId="name">
                      <Form.Label>Your Name:</Form.Label>
                      <Form.Control type="text" placeholder="Enter name" />
                    </Form.Group>
                    : ""}
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address:</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" />
                  </Form.Group>
                  {insideRegister ?
                    <div className='text-end'>
                      <Button className='m-2'>Sign up</Button>
                      <p className='p-3'>Already have an account? Click here to <Link to={'/login'}>Sign in</Link></p>
                    </div>
                    :
                    <div className='text-end'>
                      <Button className='m-2'>Sign in</Button>
                      <p className='p-3'>New user? Click here to <Link to={'/register'}>Register</Link></p>

                    </div>
                  }



                </Form>


              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  )
}

export default Auth