import React from 'react'
import { Button, DatePicker, Form, InputNumber, Panel, SelectPicker } from 'rsuite'

export default function LoanCalculators() {
  const ChargeTypeData = [
    {label:'Once Off', value:'once_off'},
    {label:'Compound', value:'compound'}
  ];
  return (
    <>
      <Panel header="Loan Calculator &nbsp; &nbsp; &nbsp; &nbsp;" shaded collapsible className='bg-white' style={{margin: '0 auto',textAlign:'center', minWidth: '95%'}}>
        {/* <Placeholder.Paragraph /> */}
        <hr />
        <Form layout="inline" fluid={true}>
          <Form.Group controlId="principle-7" >
            <Form.HelpText>
              Principle Amount 
              <Form.HelpText tooltip>Principle amount (Amount customer is asking for)</Form.HelpText>
            </Form.HelpText>
            <Form.Control name="principle"placeholder='1' title='Principle Amount' style={{ width: 160 }} step={0.01} accepter={InputNumber} min={1}/>
          </Form.Group>
          <Form.Group controlId="interest-fee-7">
            <Form.HelpText>
              Interest fee
              <Form.HelpText tooltip>How much interest is to be charged per month or for the entire loan (Check Charge Criteria) </Form.HelpText>
            </Form.HelpText>
            <Form.Control name="interest-fee" placeholder='0%' title='Interest Fee' style={{ width: 160 }} step={0.01} accepter={InputNumber} min={0}/>
          </Form.Group>
          <Form.Group controlId="duration-fee-7">
            <Form.HelpText >
              duration (Months)
              <Form.HelpText tooltip>Loan Duration (How many months should it take for this loan to be settled)</Form.HelpText>
            </Form.HelpText>
            <Form.Control name="duration-fee" placeholder='1' title='duration (Months)' style={{ width: 160 }} accepter={InputNumber} min={1}/>
            
          </Form.Group>
          <Form.Group controlId="disbursement-date-7">
            <Form.HelpText>
              Disbursement date
              <Form.HelpText tooltip>Loan activation date / day when loan duration should begin counting</Form.HelpText>
            </Form.HelpText>
            <Form.Control name="disbursement-date" style={{ width: 160 }} accepter={DatePicker} />
          </Form.Group>
          <Form.Group controlId="charge-criteria">
            <Form.HelpText>
              Charge criteria
              <Form.HelpText tooltip>
                Once off: Interest is applied once for the entire balance until the loan is settled. 
                <hr style={{margin:'5px 0'}} />
                Compound: Interest amount is re-applied to the pending balance each month, until the loan is fully settled.
              </Form.HelpText>
            </Form.HelpText>
            <Form.Control name="charge-criteria" accepter={SelectPicker} data={ChargeTypeData} style={{ width: 160 }} placeholder='Select Criteria' />
          </Form.Group>


          <hr />
          <Button appearance='primary'>Calculate</Button>
        </Form>
      </Panel>
    </>
  )
}
