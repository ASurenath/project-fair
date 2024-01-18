import React from 'react'
import Add from './Add'
import { Button } from 'react-bootstrap'
import Edit from './Edit'


function MyProjects() {
  return (
    <>
      <div className='p-2 border rounded'>
        <div className="d-flex justify-content-between">
          <h2>My Projects</h2>
          <Add />
        </div>
        <div className="d-flex justify-content-between align-items-center rounded border p-2">
          <h5>Title</h5>
          <div className="icons d-flex justify-content-between">
            <Edit/>
            <a href='' target='_blank'>
              <i className="fa-brands fa-github fa-2x"></i>
            </a>
            <Button variant='link' className='text-danger'><i className="fa-solid fa-trash-can fa-2x"></i></Button>

          </div>
        </div>


      </div>
    </>
  )
}

export default MyProjects