import { signal } from '@preact/signals';
import { addMonths, format } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { Button, ButtonToolbar, DatePicker, Form, InputNumber, Panel, Schema, SelectPicker } from 'rsuite'
import numberFormat from '../utils/numberFomart';
import LoanRepayments from './Tables/LoanRepayments';

const { StringType, NumberType, DateType } = Schema.Types;
const requiredMsg = 'This field is required.';
const model = Schema.Model({
  principle: NumberType().isRequired(requiredMsg),
  interest: NumberType().isRequired(requiredMsg),
  duration: NumberType().isRequired(requiredMsg),
  startDate: DateType().isRequired(requiredMsg),
  chargeCriteria: StringType().isRequired(requiredMsg),
  repaymentPlan: StringType().isRequired(requiredMsg), 
});

export default function CompoundLoanCalculator() {
  const [inputFields, setInputFields] = useState({});
  const paymentDate = signal(inputFields.date);
  const [data, setData] = useState([]);
  const ChargeTypeData = [
    {label:'Simple interest', value:'simple'},
    {label:'Compound Interest', value:'compound'}
  ];
  const repaymentPlanData = [
    {label:'Once Off', value:'once_off'},
    {label:'monthly', value:'monthly'}
  ];
  useEffect(() =>{
    setData(() => []);
  }, [inputFields]);

  const CalculateCompound = () =>{
    // console.log(inputFields);
    if(inputFields.principal && inputFields.principal !== undefined && 
      inputFields.interest && inputFields.interest !== undefined && 
      inputFields.time && inputFields.time !== undefined &&
      inputFields.paymentPlan && inputFields.paymentPlan !== undefined&&
      inputFields.criteria && inputFields.criteria !== undefined &&
      inputFields.date && inputFields.date !== undefined){
      const principal = parseFloat(inputFields.principal);
      const time = parseInt(inputFields.time);
      let rate = parseFloat(inputFields.interest);

      const tempData = [];
      if(inputFields.criteria === 'simple'){
        const totalBalance = principal + ((rate/100) * principal);
        tempData.push({
          id: '-',
          amount: '-',
          date: '-',
          balance: numberFormat(totalBalance)
        });
        if(time === 1 || inputFields.paymentPlan === 'once_off'){
          tempData.push({
            id: 1,
            amount: numberFormat(totalBalance),
            date: format(addMonths(inputFields.date, inputFields.time), 'eee, eo LLL, yyyy').toString(),
            balance: '-'
          });
        }else{
          const inst = Array(time).fill(totalBalance/time);
          let reducingBalance = totalBalance;
          inst.forEach((amount, i) =>{
            reducingBalance -= amount;
            paymentDate.value = addMonths(paymentDate.value,  1);
            tempData.push({
              id: i+1,
              amount: numberFormat(amount),
              date: format(paymentDate.value, 'eee, eo LLL, yyyy').toString(),
              balance: numberFormat(Math.abs(reducingBalance))
            });
          });
        }
      }else{
        const compoundInterest = (p, t, r, n=1) => {
          const amount = p * (Math.pow((1 + ((r/100) / n)), (n * t)));
          const interest = amount - p;
          return interest;
        };
        const compounded = compoundInterest(principal, time, rate);
        const totalBalance = compounded + principal;
        tempData.push({
          id: '-',
          amount: '-',
          date: '-',
          balance: numberFormat(Math.abs(totalBalance))
        });
        if(time === 1 || inputFields.paymentPlan === 'once_off'){
          tempData.push({
            id: 1,
            amount: numberFormat(totalBalance),
            date: format(addMonths(inputFields.date, inputFields.time), 'eee, eo LLL, yyyy').toString(),
            balance: '-'
          });
        }else{
          const inst = Array(time).fill(totalBalance/time);
          let reducingBalance = totalBalance;
          inst.forEach((amount, i) =>{
            reducingBalance -= amount;
            paymentDate.value = addMonths(paymentDate.value, 1);
            tempData.push({
              id: i+1,
              amount: numberFormat(Math.abs(amount)),
              date: format(paymentDate.value, 'eee, eo LLL, yyyy').toString(),
              balance: numberFormat(Math.abs(reducingBalance))
            });
          });
        }
      }
      setData(() => tempData);
    }
  }

  return (
    <>
      <Panel header="Loan Calculator &nbsp; &nbsp; &nbsp; &nbsp;" shaded collapsible className='bg-white panel'>
        {/* <Placeholder.Paragraph /> */}
        <hr />
        <Form layout="inline" fluid={true} 
          model={model}
          onSubmit={((e) => {CalculateCompound()})}
        >
          <Form.Group controlId="principle-7" >
            <Form.HelpText>
              Principle Amount 
              <Form.HelpText tooltip>Principle amount (Amount customer is asking for)</Form.HelpText>
            </Form.HelpText>
            <Form.Control 
            defaultValue={inputFields.principal ? inputFields.principal: null }
            onChange={(val) => (setInputFields((curr) => ({...curr, principal: val})))}
            name="principle"placeholder='1' title='Principle Amount' style={{ width: 160 }} step={0.01} accepter={InputNumber} min={1}/>
          </Form.Group>
          <Form.Group controlId="interest-fee-7">
            <Form.HelpText>
              Interest rate (%)
              <Form.HelpText tooltip>How much interest fee (in % - percentage) is to be charged per month or for the entire loan (Check monetization Criteria) </Form.HelpText>
            </Form.HelpText>
            <Form.Control
            defaultValue={inputFields.interest ? inputFields.interest: null }
            onChange={(val) => (setInputFields((curr) => ({...curr, interest: val})))}
            name="interest" placeholder='0%' title='Interest Fee' style={{ width: 160 }} step={0.01} accepter={InputNumber} min={0}/>
          </Form.Group>
          <Form.Group controlId="duration-fee-7">
            <Form.HelpText >
              duration (Months)
              <Form.HelpText tooltip>Loan Duration (How many months should it take for this loan to be settled)</Form.HelpText>
            </Form.HelpText>
            <Form.Control
            defaultValue={inputFields.time ? inputFields.time: null }
            onChange={(val) => (setInputFields((curr) => ({...curr, time: val})))}
            name="duration" placeholder='1' title='duration (Months)' style={{ width: 160 }} accepter={InputNumber} min={1}/>
            
          </Form.Group>
          <Form.Group controlId="charge-criteria">
            <Form.HelpText>
              monetization criteria
              <Form.HelpText tooltip>
                Simple interest: Interest is applied once for the entire balance until the loan is settled. 
                <hr style={{margin:'5px 0'}} />
                Compound: Interest amount is re-applied to the pending balance each month, until the loan is fully settled.
              </Form.HelpText>
            </Form.HelpText>
            <Form.Control
            defaultValue = {inputFields.criteria !== undefined ? inputFields.criteria : null}
            onSelect={(value) =>  (setInputFields((curr) => ({...curr, criteria: value})))}            
            name="chargeCriteria" accepter={SelectPicker} data={ChargeTypeData} style={{ width: 160 }} placeholder='Select Criteria' />
          </Form.Group>
          <Form.Group controlId="repayment-plan">
            <Form.HelpText>
              Repayment plan
              <Form.HelpText tooltip>
                Once off: Payment + interest will be paid at once in full
                <hr style={{margin:'5px 0'}} />
                monthly: Repayment will be split into monthly installments
              </Form.HelpText>
            </Form.HelpText>
            <Form.Control 
               defaultValue = {inputFields.paymentPlan !== undefined ? inputFields.paymentPlan : null}
              onSelect={(value) =>  (setInputFields((curr) => ({...curr, paymentPlan: value})))}
              name="repaymentPlan" accepter={SelectPicker} data={repaymentPlanData} style={{ width: 160 }} placeholder='Select Plan' />
          </Form.Group>
          <Form.Group controlId="disbursement-date-7">
            <Form.HelpText>
              Start date
              <Form.HelpText tooltip>Loan activation date / day when loan duration should begin counting</Form.HelpText>
            </Form.HelpText>
            <Form.Control
              defaultValue={inputFields.date ? inputFields.date: null }
              onChange={(val) => (setInputFields((curr) => ({...curr, date: val})))}
              name="startDate" style={{ width: 160 }} accepter={DatePicker} />
          </Form.Group>
          <hr />
          <ButtonToolbar>
            <Button appearance="primary" type="submit">
              Calculate
            </Button>
          </ButtonToolbar>
        </Form>
        {data.length > 0 && 
          <Panel bordered>
            <LoanRepayments data={data} />
          </Panel>
        }
      </Panel>
    </>
  )
}
