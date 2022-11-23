import React, { useEffect, useState } from 'react'
import { Button, ButtonToolbar, Col, Form, Panel, Row, Whisper, Tooltip, Loader, Modal} from 'rsuite'
import Close from '@rsuite/icons/Close';
import  RemindIcon from '@rsuite/icons/RemindOutline';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

export default function AddBorrower() {
  const MySwal = withReactContent(Swal)
  const [formData, setFormData] = useState({});

  const [processing, setProcessing] = useState(false);
  const [displayData, setDisplayData] = useState(null);
  const reset = () =>{
    setDisplayData(
      <Form onSubmit={(e) => addBorrower()} className='animate__animated animate__fadeIn'>
        <Row className="show-grid">
          <Col xs={12}>
          <Form.Group controlId="firstName">
            <Form.ControlLabel>First name *</Form.ControlLabel>
            <Form.Control defaultValue={formData.firstName} onChange={(value => setFormData(prev => ({...prev, firstName: value})))} name="firstName" placeholder='Enter client first name' />
            <Form.HelpText tooltip>First name is required</Form.HelpText>
          </Form.Group>
          </Col>
          <Col xs={12}>
          <Form.Group controlId="lastName">
            <Form.ControlLabel>Last name * </Form.ControlLabel>
            <Form.Control  defaultValue={formData.lastName} onChange={(value => setFormData(prev => ({...prev, lastName: value})))} name="lastName" placeholder='Enter client last name'/>
            <Form.HelpText tooltip>Last name is required</Form.HelpText>
          </Form.Group>
          </Col>
        </Row>
        <br /><br />
        <Row className="show-grid">
          <Col xs={12}>
          <Form.Group controlId="phoneNumber">
            <Form.ControlLabel>Phone number *</Form.ControlLabel>
            <Form.Control defaultValue={formData.phoneNumber} onChange={(value => setFormData(prev => ({...prev, phoneNumber: value})))} name="phoneNumber" placeholder='Enter client Phone number'/>
            <Form.HelpText tooltip>Phone number is required</Form.HelpText>
          </Form.Group>
          </Col>
          <Col xs={12}>
          <Form.Group controlId="nrc">
            <Form.ControlLabel>NRC number *</Form.ControlLabel>
            <Form.Control defaultValue={formData.nrcNumber} onChange={(value => setFormData(prev => ({...prev, nrcNumber: value})))} name="nrc" placeholder='Enter NRC ID number' />
            <Form.HelpText tooltip>NRC number is required</Form.HelpText>
          </Form.Group>
          </Col>
        </Row>        
        <ButtonToolbar>
          <Whisper placement='top' trigger='hover' speaker={
            <Tooltip>
              Note: You can always add more information fields later through the client profile page.
            </Tooltip>
          }>
            <Button appearance="primary" type="submit">
              Save Details
            </Button>
          </Whisper>
        </ButtonToolbar>
      </Form>
    );
    setProcessing(false);
  }
  useEffect(() => {
    reset();
  },[]);
  
  useEffect(() =>{
    sessionStorage.setItem('formData', JSON.stringify(formData))
  }, [formData])
  const addBorrower = () =>{
    const inputFields = JSON.parse(sessionStorage.getItem('formData')) || {};
    // console.log(inputFields);
    if(
      inputFields.firstName !== undefined && inputFields.firstName.replace(' ', '').length > 1 &&
      inputFields.lastName !== undefined && inputFields.lastName.replace(' ', '').length > 1 &&
      inputFields.phoneNumber !== undefined && inputFields.phoneNumber.replace(' ', '').length > 1 &&
      inputFields.nrcNumber !== undefined && inputFields.nrcNumber.replace(' ', '').length > 6
    ){
      setDisplayData(<Loader size='lg' content="Processing..." vertical />);
      setProcessing(true);
    }else{
      Swal.fire({
        icon: 'warning',
        text: 'Kindly fill in all the required fields with valid information.',
        showCloseButton: true,
        showConfirmButton: false,
        toast:true,
        position: 'top-right',
        timer: 3500,
        showClass: {
          popup: 'animate__animated animate__fadeIn'
        }
      });
    }
  }

  return (
    <Panel header='Add Borrower' className='bg-white panel animate__animated animate__fadeIn animate__slower'>
      <hr className='hr'/>
      <br />
        {
          displayData
        }
        {
          processing ? 
          <>
            <br />
            <Button appearance='default' title='Cancel operation' onClick={() => reset()}>
              &nbsp; Cancel &nbsp;  <Close /> &nbsp;
            </Button>
          </>
          : null
        }
    </Panel>
  )
}
