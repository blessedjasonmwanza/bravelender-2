import React, { useEffect, useState } from 'react'
import { Button, ButtonToolbar, Col, Form, Panel, Row, Whisper, Tooltip, Loader} from 'rsuite'
import ReloadIcon from '@rsuite/icons/Reload';

export default function AddBorrower() {
  const [processing, setProcessing] = useState(false);
  const [displayData, setDisplayData] = useState(null);
  const reset = () =>{
    setDisplayData(
      <Form onSubmit={(e) => addBorrower()}>
        <Row className="show-grid">
          <Col xs={12}>
          <Form.Group controlId="firstName">
            <Form.ControlLabel>First name *</Form.ControlLabel>
            <Form.Control name="firstName" />
            <Form.HelpText tooltip>First name is required</Form.HelpText>
          </Form.Group>
          </Col>
          <Col xs={12}>
          <Form.Group controlId="lastName">
            <Form.ControlLabel>Last name * </Form.ControlLabel>
            <Form.Control name="lastName" />
            <Form.HelpText tooltip>Last name is required</Form.HelpText>
          </Form.Group>
          </Col>
        </Row>
        <br /><br />
        <Row className="show-grid">
          <Col xs={12}>
          <Form.Group controlId="phoneNumber">
            <Form.ControlLabel>Phone number *</Form.ControlLabel>
            <Form.Control name="phoneNumber" />
            <Form.HelpText tooltip>Phone number is required</Form.HelpText>
          </Form.Group>
          </Col>
          <Col xs={12}>
          <Form.Group controlId="nrc">
            <Form.ControlLabel>NRC number *</Form.ControlLabel>
            <Form.Control name="nrc" />
            <Form.HelpText tooltip>NRC number is required</Form.HelpText>
          </Form.Group>
          </Col>
        </Row>        
        <ButtonToolbar>
          <Whisper placement='top' trigger='hover' speaker={
            <Tooltip>
            Note: You can always add more information fields later to the client profile.
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
  const addBorrower = () =>{
    setDisplayData(<Loader size='lg' content="Processing..." vertical />);
    setProcessing(true);
  }

  return (
    <Panel header='Add Borrower' className='bg-white panel'>
      <hr className='hr'/>
      <br />
        {
          displayData
        }
        {
          processing ? 
          <>
            <br />
            <Button appearance='default' title='Cancel' onClick={() => reset()}>
              &nbsp; Cancel &nbsp;  <ReloadIcon /> &nbsp;
            </Button>
          </>
          : null
        }
    </Panel>
  )
}
