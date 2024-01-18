import React, { useState } from 'react'
import { Button, Collapse, Form } from 'react-bootstrap'
import dp from '../assets/dp.png'



function Profile() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='border rounded p-3 my-2'>
        <div className=' fs-3 d-flex justify-content-between'>
          <h3>Profile</h3>
          <Button onClick={() => setOpen(!open)}>
            <i class="fa-solid fa-chevron-down"></i>
          </Button>
        </div>
        <Collapse in={open}>
          <div id="example-collapse-text">
            <form>
              <label className='text-center'>
                <input type='file' style={{ display: 'none' }} />
                <img className='img-fluid' src={dp} alt="" style={{ cursor: 'pointer', margin: 'auto', width: '80%' }} />
              </label>

              <div className='mt-3'>
                <input type="text" placeholder='Enter your Github link here' className='form-control' />
              </div>

              <div className='mt-3'>
                <input type="text" placeholder='Enter your LinkedIn link here' className='form-control' />
              </div>
              <div className='mt-3'>
                <Button className='w-100'>
                  Update
                </Button>
              </div>
            </form>
          </div>
        </Collapse>
      </div>
    </>
  )
}

export default Profile