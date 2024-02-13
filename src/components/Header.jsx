import React, { useContext } from 'react'
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { tockenAuthContext } from '../Context/TokenAuth';

function Header({insideDashboard}) {
  const {isLoggedin,setIsLoggedin}=useContext(tockenAuthContext)
  const navigate=useNavigate()
  const handleLogout=()=>{
    sessionStorage.clear()
    setIsLoggedin(false)
    navigate('/')
  }
  return (
    <Navbar className="bg-primary position-sticky pb-0 d-flex justify-content-between" style={{height:'60px'}}>
      <Container className='pb-0 mb-0'>
        <Link to={'/'} style={{ padding: 0, margin: 0 }}>
          <Navbar.Brand className='fw-bold fs-4 pb-0'>
            <h2 className='mt-2 mb-0 pb-0 pt-3'>
              <i className="fa-solid fa-laptop-code"></i>Project Fair
            </h2>
          </Navbar.Brand>
        </Link>
        {insideDashboard&&
          <Button onClick={handleLogout} variant={'link'} ><h3><i className="fa-solid fa-right-from-bracket"></i>Log out</h3></Button>
        }
      </Container>
    </Navbar>
  )
}

export default Header