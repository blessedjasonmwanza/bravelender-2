import React, { useEffect, useState } from 'react'
import { Sidenav, Nav } from 'rsuite';
import HomeIcon from '@rsuite/icons/legacy/Home';
import UserPlus from '@rsuite/icons/legacy/UserPlus';
import PencilSquare from '@rsuite/icons/legacy/PencilSquare';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import PeoplesCostomizeIcon from '@rsuite/icons/PeoplesCostomize';
import PageIcon from '@rsuite/icons/Page';
import UserInfo from '@rsuite/icons/legacy/UserInfo';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import { Site } from '@rsuite/icons';

const panelStyles = {
  padding: '2px 20px',
  fontSize: 11,
  textAlign:'center',
  color: '#777',
  borderBottom: '1px solid #dee0e159',
  background: 'rgb(233 232 232 / 80%)'
};

export default function LeftNav({expanded, setExpanded}) {
  const logo = 'favicon.png';
  const mainNavStyle ={
    expanded: {
      width: 'var(--main-nav-width)',
    },
    minimized: {
      width: 'var(--main-nav-width-min)',
    }
  }
  window.addEventListener('resize', ()=>{
    if(window.innerWidth < 780){
      setExpanded(false);
    }else{
      setExpanded(() => true);
    }
  });
  useEffect(()=>{
    if(window.innerWidth <780){
      setExpanded(() => false);
    }else{
      setExpanded(() => true);
    }
  }, []);
  return (
  <div style={
    expanded ?
    mainNavStyle.expanded:
    mainNavStyle.minimized
  } className="main-nav">
    <Sidenav expanded={expanded} defaultOpenKeys={[]} style={{height: '100%'}}>
      {/* <Sidenav.Header >
        {
          expanded ?
          <h4 className='brand-branch-name' >
            Mwinilunga Branch
          </h4> :
          <img src={logo} className='nav-logo' alt='logo' />
        }
      </Sidenav.Header> */}
      <Sidenav.Body>
        <Nav>
          <Nav.Item eventKey="1" icon={<HomeIcon />} active>
            Home
          </Nav.Item>
          <hr  style={{margin: 0}}/>
          {
            expanded &&
            <Nav.Item panel style={panelStyles}>
              {/* Data Entry */}
            </Nav.Item>
          }
          <Nav.Menu eventKey="2" title="Add Clients" icon={<UserPlus />}>
            <Nav.Item eventKey="2-1" icon={<UserInfo />}>Borrower</Nav.Item>
            <Nav.Item eventKey="2-3" icon={<PeoplesCostomizeIcon />}>Create Group</Nav.Item>
            <Nav.Item eventKey="2-4" icon={<PageIcon />} >Create Contract</Nav.Item>
          </Nav.Menu>
          <Nav.Menu eventKey="3" title="New Loan" icon={<PencilSquare />}>
            <Nav.Item eventKey="3-1" icon={<UserInfo />} title='Give a to an Individual'>Personal Loan</Nav.Item>
            <Nav.Item eventKey="3-2" icon={<PeoplesCostomizeIcon />} title='Give a loan to a specific group'>Group Loan</Nav.Item>
            <Nav.Item eventKey="3-4" icon={<PageIcon />} title='Give a loan to members of an institution/organization'>MOU Loan</Nav.Item>
          </Nav.Menu>
          <Nav.Item eventKey="1" icon={<Site />} title='Record a loan repayment /remission'>
            Repayment
          </Nav.Item>
          <Nav.Item eventKey="1" icon={<Site />} title='Record an expense'>
            Expense
          </Nav.Item>

          <hr  style={{margin: 0}}/>
          {
            expanded &&
            <Nav.Item panel style={panelStyles}>
              {/* Operations */}
            </Nav.Item>
          }

          <Nav.Menu eventKey="5" title="Clients" icon={<GroupIcon />}>
            <Nav.Item eventKey="5-1" icon={<MagicIcon />} title='Individual borrowers profiles'>borrowers</Nav.Item>
            <Nav.Item eventKey="5-2" icon={<MagicIcon />} title='Groups & Members'>Groups</Nav.Item>
            <Nav.Item eventKey="5-2" icon={<MagicIcon />} title='MOU contracts'>MOUs</Nav.Item>
          </Nav.Menu>
          <Nav.Menu eventKey="6" title="Loans" icon={<Site />}>
            <Nav.Item eventKey="6-1" icon={<MagicIcon />} title='Approve or Reject Loan Applications'>Applications</Nav.Item>
            <Nav.Item eventKey="6-1" icon={<MagicIcon />} title='View, Disbursed, active and default loans'>Disbursements</Nav.Item>
          </Nav.Menu>
            <Nav.Item eventKey="7" icon={<Site />} title='View, Loan remissions & repayments'>Repayments</Nav.Item>
          <Nav.Item eventKey="1" icon={<Site />} title='Record an expense'>
            Expenses
          </Nav.Item>

          {/* <hr  style={{margin: 0}}/> */}
          {
            // expanded &&
            // <Nav.Item panel style={panelStyles}>
            //   Accounts
            // </Nav.Item>
          }
          <Nav.Menu eventKey="8" title="Statements" icon={<Site />}>
          <Nav.Item eventKey="8-1" icon={<MagicIcon />} title='Give a to an Individual'>Income Stmt</Nav.Item>
            <Nav.Item eventKey="8-2" icon={<MagicIcon />} title='Give a to an Individual'>Profit & Loss</Nav.Item>
            <Nav.Item eventKey="8-3" icon={<MagicIcon />} title='Give a loan to a specific group'>Balance Sheets</Nav.Item>
          </Nav.Menu>

          <hr  style={{margin: 0}}/>
          {
            expanded &&
            <Nav.Item panel style={panelStyles}>
              {/* Configurations */}
            </Nav.Item>
          }
          <Nav.Menu eventKey="4" title="Settings" icon={<GearCircleIcon />}>
            <Nav.Item eventKey="4-1">Applications</Nav.Item>
            <Nav.Item eventKey="4-2">Channels</Nav.Item>
            <Nav.Item eventKey="4-3">Versions</Nav.Item>
            <Nav.Menu eventKey="4-5" title="Custom Action">
              <Nav.Item eventKey="4-5-1">Action Name</Nav.Item>
              <Nav.Item eventKey="4-5-2">Action Params</Nav.Item>
            </Nav.Menu>
          </Nav.Menu>
        </Nav>
      </Sidenav.Body>
    </Sidenav>
  </div>
  )
}
